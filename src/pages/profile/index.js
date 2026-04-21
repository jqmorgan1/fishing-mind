import { Component } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import './index.css';

const mockUser = {
  nickname: '钓鱼达人',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
  level: '钓场老炮',
  exp: 450,
  nextLevelExp: 800,
  city: '北京',
  fishingStyles: ['台钓', '路亚'],
  stats: {
    totalCatches: 128,
    maxWeight: 18.5,
    totalWeight: 892.3,
    followers: 256,
    following: 89
  },
  badges: [
    { id: 1, name: '首钓', icon: '🎣', unlocked: true },
    { id: 2, name: '10斤+', icon: '🦈', unlocked: true },
    { id: 3, name: '百钓达人', icon: '🏅', unlocked: true },
    { id: 4, name: '鱼王', icon: '👑', unlocked: false },
    { id: 5, name: '封神', icon: '🌟', unlocked: false },
  ]
};

const mockRecentCatches = [
  { id: 1, fish: '黑鱼', weight: 12.5, unit: '斤', pond: '黑坑王者钓场', time: '2天前', photo: 'https://picsum.photos/200/200?random=51' },
  { id: 2, fish: '草鱼', weight: 8.3, unit: '斤', pond: '龙泉黑坑', time: '5天前', photo: 'https://picsum.photos/200/200?random=52' },
  { id: 3, fish: '鲈鱼', weight: 3.2, unit: '斤', pond: '野钓-苏州河', time: '1周前', photo: 'https://picsum.photos/200/200?random=53' },
];

class Profile extends Component {
  state = {
    user: mockUser
  };

  render() {
    const { user } = this.state;
    const expProgress = ((user.exp - 300) / (user.nextLevelExp - 300)) * 100;

    return (
      <View className="profile-page">
        <ScrollView scrollY className="profile-scroll">
          {/* 用户信息卡片 */}
          <View className="profile-header">
            <View className="header-bg" />
            <View className="user-card">
              <Image src={user.avatar} className="avatar" />
              <View className="user-info">
                <View className="name-row">
                  <Text className="nickname">{user.nickname}</Text>
                  <View className="level-badge">
                    <Text className="level-icon">🎖️</Text>
                    <Text className="level-text">{user.level}</Text>
                  </View>
                </View>
                <Text className="user-city">📍 {user.city}</Text>
                <View className="styles-row">
                  {user.fishingStyles.map((style, idx) => (
                    <Text key={idx} className="style-tag">{style}</Text>
                  ))}
                </View>
              </View>
              <View className="edit-btn">
                <Text>✏️ 编辑</Text>
              </View>
            </View>

            {/* 经验值进度 */}
            <View className="exp-bar">
              <View className="exp-info">
                <Text className="exp-label">经验值</Text>
                <Text className="exp-value">{user.exp} / {user.nextLevelExp}</Text>
              </View>
              <View className="exp-track">
                <View className="exp-fill" style={{ width: `${expProgress}%` }} />
              </View>
            </View>
          </View>

          {/* 数据统计 */}
          <View className="stats-grid">
            <View className="stat-card">
              <Text className="stat-value">{user.stats.totalCatches}</Text>
              <Text className="stat-label">总钓次数</Text>
            </View>
            <View className="stat-card">
              <Text className="stat-value">{user.stats.maxWeight}</Text>
              <Text className="stat-label">最重(斤)</Text>
            </View>
            <View className="stat-card">
              <Text className="stat-value">{user.stats.followers}</Text>
              <Text className="stat-label">粉丝</Text>
            </View>
            <View className="stat-card">
              <Text className="stat-value">{user.stats.following}</Text>
              <Text className="stat-label">关注</Text>
            </View>
          </View>

          {/* 徽章墙 */}
          <View className="section">
            <View className="section-header">
              <Text className="section-title">🏆 徽章墙</Text>
              <Text className="section-more">查看全部 ></Text>
            </View>
            <View className="badges-grid">
              {user.badges.map(badge => (
                <View key={badge.id} className={`badge-item ${badge.unlocked ? '' : 'locked'}`}>
                  <Text className="badge-icon">{badge.icon}</Text>
                  <Text className="badge-name">{badge.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 最近战绩 */}
          <View className="section">
            <View className="section-header">
              <Text className="section-title">📸 最近战绩</Text>
              <Text className="section-more">查看全部 ></Text>
            </View>
            <View className="catches-list">
              {mockRecentCatches.map(catchItem => (
                <View key={catchItem.id} className="catch-item">
                  <Image src={catchItem.photo} className="catch-photo" />
                  <View className="catch-info">
                    <Text className="catch-fish">🐟 {catchItem.fish}</Text>
                    <Text className="catch-weight">{catchItem.weight}{catchItem.unit}</Text>
                    <Text className="catch-pond">📍 {catchItem.pond}</Text>
                  </View>
                  <Text className="catch-time">{catchItem.time}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 功能菜单 */}
          <View className="menu-section">
            <View className="menu-item">
              <Text className="menu-icon">📊</Text>
              <Text className="menu-text">数据报告</Text>
              <Text className="menu-arrow">></Text>
            </View>
            <View className="menu-item">
              <Text className="menu-icon">⭐</Text>
              <Text className="menu-text">收藏的鱼塘</Text>
              <Text className="menu-arrow">></Text>
            </View>
            <View className="menu-item">
              <Text className="menu-icon">👥</Text>
              <Text className="menu-text">我的车队</Text>
              <Text className="menu-arrow">></Text>
            </View>
            <View className="menu-item">
              <Text className="menu-icon">🎫</Text>
              <Text className="menu-text">参加的赛事</Text>
              <Text className="menu-arrow">></Text>
            </View>
            <View className="menu-item">
              <Text className="menu-icon">💎</Text>
              <Text className="menu-text">会员中心</Text>
              <Text className="menu-arrow">></Text>
            </View>
            <View className="menu-item">
              <Text className="menu-icon">⚙️</Text>
              <Text className="menu-text">设置</Text>
              <Text className="menu-arrow">></Text>
            </View>
          </View>

          <View className="safe-bottom" />
        </ScrollView>
      </View>
    );
  }
}

export default Profile;
