# 钓鱼脑 · 实时地图模块规格书 v1.0

> 版本：v1.0 | 日期：2026-04-21 | 适用于 Vibe Coding / AI辅助开发

---

## 一、技术栈

- **平台**：微信小程序（原生）
- **地图**：腾讯地图 SDK（`qqmap-wx-jssdk`）
- **后端**：Node.js + MySQL（或微信云开发 CloudBase）
- **实时推送**：微信订阅消息 + WebSocket（云开发实时数据库监听）
- **文件存储**：腾讯云 COS

---

## 二、地图主页面布局

```
┌─────────────────────────────┐
│ 气象条（固定顶部）          │ z-index: 100
├─────────────────────────────┤
│ 实时动态面板（右上角）      │ z-index: 100
├─────────────────────────────┤
│ 搜索栏（固定顶部）          │ z-index: 100
│ 筛选标签横向滚动           │ z-index: 100
├─────────────────────────────┤
│                           │
│  腾讯地图（全屏）          │ flex:1
│  ├── 鱼塘 Marker           │
│  ├── 野钓点 Marker        │
│  ├── 人气热力图层          │
│  └── 实时上鱼 Toast        │
│                           │
├─────────────────────────────┤
│ 底部抽屉（可上拉展开）      │ 收起:180px / 展开:60%屏
│ ├── Tab: 附近鱼塘          │
│ ├── Tab: 今日排行          │
│ └── Tab: 进行中赛事        │
└─────────────────────────────┘
```

---

## 三、核心 API 接口

### 鱼塘相关
| 接口 | 说明 |
|------|------|
| `GET /api/ponds` | 获取附近鱼塘列表（lat, lng, radius, fish_type, has_event, fresh_only）|
| `GET /api/ponds/:id` | 鱼塘详情 |
| `GET /api/ponds/:id/reports` | 鱼情播报列表 |
| `GET /api/ponds/:id/catches` | 鱼塘战绩列表 |
| `GET /api/ponds/:id/stats` | 在线人数、今日上鱼数（实时） |
| `POST /api/ponds/:id/checkin` | 到达鱼塘打卡（更新在线人数） |

### 战绩相关
| 接口 | 说明 |
|------|------|
| `GET /api/catches/latest` | 最新渔获（用于Toast）（lat, lng, radius, limit） |

### 排行相关
| 接口 | 说明 |
|------|------|
| `GET /api/rankings/city` | 城市今日排行（date=today, limit=20） |
| `GET /api/rankings/pond/:id` | 本塘排行 |

### 赛事相关
| 接口 | 说明 |
|------|------|
| `GET /api/contests/active` | 进行中赛事列表 |
| `GET /api/contests/:id` | 赛事详情 |

### 野钓点
| 接口 | 说明 |
|------|------|
| `GET /api/wild-spots` | 野钓点列表（需鉴权） |
| `POST /api/wild-spots` | 上传野钓点（需鉴权） |

### 天气
| 接口 | 说明 |
|------|------|
| `GET /api/weather` | 当前位置天气+钓鱼指数（lat, lng） |

---

## 四、Marker 状态与图标

| 状态 | 判断条件 | 图标 | 气泡颜色 |
|------|---------|------|---------|
| 超热闹 | 当前人数 ≥ 30 | 🔥 | #E24B4A |
| 有赛事 | has_active_contest=true | 🏆 | #7F77DD |
| 刚补鱼 | 鱼情发布时间 < 12h | ✨ | #1D9E75 |
| 普通 | 其他 | 🎣 | #378ADD |
| 野钓点 | type='wild' | 🏕️ | #5DCAA5 |

---

## 五、实时数据方案

### 方案A - 轮询（简单）
```javascript
// 每30秒请求一次最新战绩
setInterval(() => {
  this.fetchLatestCatches()
}, 30000)
```

### 方案B - WebSocket（实时，推荐）
```javascript
// 云开发实时数据库监听
const db = wx.cloud.database()
db.collection('catches')
  .where({ created_at: db.command.gt(Date.now() - 60000) })
  .watch({
    onChange: (snapshot) => {
      snapshot.docChanges.forEach(change => {
        if (change.queueType === 'enqueue') {
          this.showToast(change.doc)
        }
      })
    }
  })
```

### Toast 显示逻辑
```javascript
showToastQueue(catches) {
  let delay = 0
  catches.forEach(c => {
    setTimeout(() => {
      this.setData({ toast: { show: true, ... } })
      setTimeout(() => this.setData({ 'toast.show': false }), 4000)
    }, delay)
    delay += 8000 + Math.random() * 7000
  })
}
```

---

## 六、钓鱼气象条

```
🌤 23°C 东风3级 气压1012hPa 钓鱼指数 ★★★★☆
```

### 钓鱼指数算法
```javascript
function calcFishingIndex(weather) {
  let score = 0
  // 气压：1005-1020 最佳
  if (weather.pressure >= 1005 && weather.pressure <= 1020) score += 2
  else if (weather.pressure > 1000) score += 1
  // 风力：1-3级最佳
  if (weather.windLevel <= 3) score += 2
  else if (weather.windLevel <= 5) score += 1
  // 温度：15-28度最佳
  if (weather.temp >= 15 && weather.temp <= 28) score += 1
  // 天气：阴天 > 多云 > 晴 > 雨
  if (['阴','多云'].includes(weather.desc)) score += 1
  return Math.min(score, 5)
}
```

---

## 七、数据库表

### 鱼情播报
```sql
CREATE TABLE pond_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pond_id INT NOT NULL,
  content TEXT,
  fish_types JSON,
  weight_kg FLOAT,
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (pond_id, created_at)
);
```

### 实时在线（打卡签到）
```sql
CREATE TABLE pond_checkins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pond_id INT NOT NULL,
  user_id INT NOT NULL,
  checked_in_at TIMESTAMP,
  checked_out_at TIMESTAMP,
  INDEX (pond_id, checked_in_at)
);
```

### 野钓点
```sql
CREATE TABLE wild_spots (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100),
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),
  fish_types JSON,
  is_free TINYINT DEFAULT 1,
  description TEXT,
  photos JSON,
  approve_status ENUM('pending','approved','rejected') DEFAULT 'pending',
  like_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 八、实时面板（右上角）

```
┌──────────────────┐
│ ● 实时动态        │
│ 🐟 张三 黑鱼6.2斤 │
│ 🏆 南郊赛 剩余1h  │
│ 📢 龙泉 刚补草鱼  │
└──────────────────┘
```

- 红点 ● 闪烁动画（CSS animation）
- 每条数据点击跳转对应页面
- 数据每 60 秒刷新

---

## 九、底部抽屉 Tab

### Tab1：附近鱼塘
每行数据：
```
[图标] 龙泉黑坑 0.8km
  草鱼·鲤鱼 | 42人在钓 [超热闹]
  今日补放草鱼200斤 🔥
```

**排序**：刚补鱼 > 有赛事 > 热闹（人数多）> 距离近

### Tab2：今日排行
```
🥇 李钓神 草鱼 18.5斤 龙泉黑坑 3小时前
🥈 张大钓 黑鱼 12.3斤 碧湖园 今天
🥉 王老五 鲤鱼 9.6斤 南郊塘 今天
```

### Tab3：进行中赛事
```
⏱️ 南郊周赛 · 草鱼专项
  23人参赛 | 奖池500元 | 剩余 58:22
  [立即报名]
```

---

## 十、野钓点功能

### 标记野钓点（UGC）
入口：地图右下角"+"按钮 → 长按地图打点 → 填写信息

### 权限解锁机制
```javascript
checkWildAccess(userId) {
  const stats = await getUserStats(userId)
  if (stats.total_catches >= 10) return true  // 上传10条战绩解锁
  if (stats.is_pro) return true               // Pro会员直接解锁
  return false
}

rewardForWildPoint(userId) {
  await addProDays(userId, 3)  // 贡献1个点 → 获3天Pro权益
  await addExp(userId, 50)
}
```

---

## 十一、MVP 开发顺序（12步）

| 步骤 | 内容 | 优先级 |
|------|------|--------|
| 1 | 地图显示 + 定位到当前位置 | P0 |
| 2 | 从接口加载鱼塘，显示 Marker（静态数据先写死） | P0 |
| 3 | 点击 Marker → 底部抽屉展开 → 显示鱼塘基本信息 | P0 |
| 4 | 实现三个底部 Tab（附近/排行/赛事） | P0 |
| 5 | 搜索功能 | P1 |
| 6 | 筛选标签联动过滤 | P1 |
| 7 | 实时 Toast（先用轮询，后期换 WebSocket） | P1 |
| 8 | 钓鱼气象条（接入天气API） | P2 |
| 9 | 热力图层 | P2 |
| 10 | 野钓点 UGC 上传和显示 | P2 |
| 11 | 鱼塘详情页完整实现 | P1 |
| 12 | WebSocket 替换轮询，真正实时化 | P3 |

---

## 十二、给开发者的注意事项

1. **地图用腾讯地图**，不要用高德（微信小程序腾讯地图原生支持）
2. **Marker 图片**放在 `images/` 目录，需要准备5种：hot / fresh / contest / normal / wild
3. **在线人数**不要用真实定位计算，用"打卡"机制——用户进入鱼塘页面自动签到，超4小时或主动离开则签出
4. **野钓点需要审核**，先存 pending 状态，人工或AI审核后显示
5. **热力图**如果腾讯地图SDK支持原生热力图层直接用，不支持则用 Canvas 覆盖层实现
6. **Toast不能太频繁**——同一个鱼塘的Toast至少间隔5分钟，避免刷屏
7. **全程使用 gcj02 坐标系**（微信/腾讯地图标准），不要混用 wgs84

---

*文档生成日期：2026年4月 | 钓鱼脑产品团队*
