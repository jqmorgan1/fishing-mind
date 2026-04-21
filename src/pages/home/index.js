import { Component } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';
import './index.css';

// 模拟数据
const mockFeed = [
  {
    id: 1,
    user: { nickname: '张大钓', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', level: '钓场老炮' },
    fish: { species: '草鱼', weight: 12.3, unit: '斤' },
    location: { name: '龙泉黑坑', distance: '3.2km' },
    photos: ['https://picsum.photos/400/300?random=1'],
    bait: '老鬼918',
    method: '台钓',
    time: '3小时前',
    likes: 34,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    user: { nickname: '李钓神', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', level: '黑坑传说' },
    fish: { species: '黑鱼', weight: 18.5, unit: '斤' },
    location: { name: '黑坑王者钓场', distance: '5.1km' },
    photos: ['https://picsum.photos/400/300?random=2'],
    bait: '路亚假饵',
    method: '路亚',
    time: '2天前',
    likes: 89,
    comments: 23,
    isLiked: true
  },
  {
    id: 3,
    user: { nickname: '王小竿', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', level: '江湖钓手' },
    fish: { species: '鲈鱼', weight: 5.6, unit: '斤' },
    location: { name: '野钓-苏州河', distance: '未知' },
    photos: ['https://picsum.photos/400/300?random=3'],
    bait: '软虫',
    method: '路亚',
    time: '5小时前',
    likes: 12,
    comments: 3,
    isLiked: false
  }
];

class Home extends Component {
  state = {
    feed: mockFeed,
    currentTab: 0
  };

  componentDidMount() {
    console.log('首页加载');
  }

  handleLike = (id) => {
    this.setState({
      feed: this.state.feed.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1
          };
        }
        return item;
      })
    });
  };

  handlePublish = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#/pages/publish/index';
    }
  };

  render() {
    const { feed } = this.state;

    return (
      <View className="home-page">
        {/* 顶部导航 */}
        <View className="header">
          <View className="header-left">
            <Text className="city">北京</Text>
            <Text className="arrow">▼</Text>
          </View>
          <View className="header-search">
            <Text className="search-placeholder">🔍 搜索鱼塘、钓友</Text>
          </View>
        </View>

        {/* 信息流内容 */}
        <ScrollView 
          className="feed-container" 
          scrollY 
          showsVerticalScrollIndicator={false}
        >
          {/* 动态列表 */}
          {feed.map(item => (
            <View key={item.id} className="feed-card">
              {/* 用户信息 */}
              <View className="feed-header">
                <View className="user-info">
                  <Image src={item.user.avatar} className="avatar" />
                  <View className="user-detail">
                    <Text className="nickname">{item.user.nickname}</Text>
                    <Text className="level-tag">{item.user.level}</Text>
                  </View>
                </View>
                <Text className="feed-time">{item.time}</Text>
              </View>

              {/* 渔获照片 */}
              <View className="feed-photos">
                {item.photos.map((photo, idx) => (
                  <Image 
                    key={idx} 
                    src={photo} 
                    className="photo"
                    mode="aspectFill"
                  />
                ))}
              </View>

              {/* 渔获信息 */}
              <View className="fish-info">
                <View className="fish-main">
                  <Text className="fish-icon">🐟</Text>
                  <Text className="fish-species">{item.fish.species}</Text>
                  <Text className="fish-weight">{item.fish.weight}{item.fish.unit}</Text>
                </View>
                <View className="location-info">
                  <Text className="location-text">📍 {item.location.name}</Text>
                  {item.location.distance !== '未知' && (
                    <Text className="distance-text"> · {item.location.distance}</Text>
                  )}
                </View>
                <View className="method-info">
                  <Text className="method-text">🎣 {item.method}</Text>
                  {item.bait && (
                    <Text className="bait-text"> · {item.bait}</Text>
                  )}
                </View>
              </View>

              {/* 互动栏 */}
              <View className="action-bar">
                <View 
                  className={`action-item ${item.isLiked ? 'liked' : ''}`}
                  onClick={() => this.handleLike(item.id)}
                >
                  <Text className="action-icon">{item.isLiked ? '❤️' : '🤍'}</Text>
                  <Text className="action-count">{item.likes}</Text>
                </View>
                <View className="action-item">
                  <Text className="action-icon">💬</Text>
                  <Text className="action-count">{item.comments}</Text>
                </View>
                <View className="action-item">
                  <Text className="action-icon">↗️</Text>
                  <Text className="action-count">分享</Text>
                </View>
              </View>
            </View>
          ))}

          {/* 底部安全区 */}
          <View className="safe-bottom" />
        </ScrollView>

        {/* 悬浮发布按钮 */}
        <View className="fab-container">
          <View className="fab" onClick={this.handlePublish}>
            <Text className="fab-text">➕</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
