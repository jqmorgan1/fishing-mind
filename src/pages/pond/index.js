import { Component } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import './index.css';

const mockPonds = [
  { id: 1, name: '龙泉黑坑', rating: 4.8, reviews: 236, distance: '3.2km', price: '计重40元/斤', fishTypes: ['草鱼', '鲤鱼', '鲫鱼'], openHours: '06:00-22:00', isVerified: true, hasFishReport: true, reportText: '今日补放草鱼200斤，鲤鱼100斤' },
  { id: 2, name: '黑坑王者钓场', rating: 4.6, reviews: 189, distance: '5.1km', price: '包天200元', fishTypes: ['黑鱼', '鲈鱼', '翘嘴'], openHours: '05:00-21:00', isVerified: true, hasFishReport: true, reportText: '黑鱼开口，路亚首选！' },
  { id: 3, name: '顺义鱼塘', rating: 4.3, reviews: 87, distance: '12km', price: '计重30元/斤', fishTypes: ['青鱼', '草鱼'], openHours: '07:00-18:00', isVerified: true, hasFishReport: false },
  { id: 4, name: '通州渔场', rating: 4.5, reviews: 156, distance: '8.5km', price: '包天150元', fishTypes: ['鲤鱼', '鲢鳙', '鲫鱼'], openHours: '06:00-20:00', isVerified: false, hasFishReport: true, reportText: '周末钓鱼比赛，奖品丰厚！' },
];

class Pond extends Component {
  state = {
    searchText: '',
    ponds: mockPonds
  };

  handleSearch = (e) => {
    const text = e.detail.value;
    this.setState({ searchText: text });
    // 简单过滤
    if (text) {
      const filtered = mockPonds.filter(p => p.name.includes(text));
      this.setState({ ponds: filtered });
    } else {
      this.setState({ ponds: mockPonds });
    }
  };

  render() {
    const { ponds } = this.state;

    return (
      <View className="pond-page">
        {/* 搜索栏 */}
        <View className="search-bar">
          <View className="search-input-wrap">
            <Text className="search-icon">🔍</Text>
            <Input 
              className="search-input" 
              placeholder="搜索鱼塘" 
              value={this.state.searchText}
              onInput={this.handleSearch}
            />
          </View>
        </View>

        {/* 地图占位 */}
        <View className="map-area">
          <View className="map-placeholder">
            <Text className="map-icon">🗺️</Text>
            <Text className="map-text">鱼塘地图</Text>
            <Text className="map-hint">显示附近鱼塘位置</Text>
          </View>
          <View className="map-toggle">
            <Text className="toggle-text">地图模式</Text>
          </View>
        </View>

        {/* 鱼塘列表 */}
        <ScrollView scrollY className="pond-list">
          <View className="list-header">
            <Text className="list-title">附近鱼塘</Text>
            <Text className="list-count">共 {ponds.length} 个</Text>
          </View>

          {ponds.map(pond => (
            <View key={pond.id} className="pond-card">
              {/* 封面 */}
              <View className="pond-cover">
                <Image 
                  src={`https://picsum.photos/400/200?random=${pond.id + 100}`} 
                  className="cover-img"
                  mode="aspectFill"
                />
                {pond.isVerified && (
                  <View className="verified-badge">✓ 认证</View>
                )}
                {pond.hasFishReport && (
                  <View className="fish-report-badge">
                    <Text className="report-icon">🔥</Text>
                    <Text className="report-text">有鱼情</Text>
                  </View>
                )}
              </View>

              {/* 鱼塘信息 */}
              <View className="pond-info">
                <View className="pond-header">
                  <Text className="pond-name">{pond.name}</Text>
                  <View className="pond-rating">
                    <Text className="star">⭐</Text>
                    <Text className="rating-text">{pond.rating}</Text>
                    <Text className="reviews">({pond.reviews})</Text>
                  </View>
                </View>

                <View className="pond-meta">
                  <Text className="meta-item">📍 {pond.distance}</Text>
                  <Text className="meta-item">💰 {pond.price}</Text>
                  <Text className="meta-item">⏰ {pond.openHours}</Text>
                </View>

                <View className="fish-tags">
                  {pond.fishTypes.map((fish, idx) => (
                    <Text key={idx} className="fish-tag">🐟 {fish}</Text>
                  ))}
                </View>

                {pond.hasFishReport && (
                  <View className="fish-report">
                    <Text className="report-content">📢 {pond.reportText}</Text>
                  </View>
                )}

                <View className="pond-actions">
                  <View className="action-btn primary">
                    <Text>📞</Text>
                    <Text>电话</Text>
                  </View>
                  <View className="action-btn">
                    <Text>🗺️</Text>
                    <Text>导航</Text>
                  </View>
                  <View className="action-btn">
                    <Text>⭐</Text>
                    <Text>收藏</Text>
                  </View>
                  <View className="action-btn">
                    <Text>↗️</Text>
                    <Text>分享</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* 我是鱼塘老板入口 */}
          <View className="owner-banner">
            <View className="owner-content">
              <Text className="owner-icon">🎣</Text>
              <View className="owner-info">
                <Text className="owner-title">我是鱼塘老板</Text>
                <Text className="owner-desc">入驻平台，获取更多客户</Text>
              </View>
            </View>
            <Text className="owner-arrow">></Text>
          </View>

          <View className="safe-bottom" />
        </ScrollView>
      </View>
    );
  }
}

export default Pond;
