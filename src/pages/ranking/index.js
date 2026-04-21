import { Component } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import './index.css';

const mockRankings = {
  city: [
    { rank: 1, user: { nickname: '李钓神', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10' }, fish: { species: '黑鱼', weight: 18.5, unit: '斤' }, pond: '黑坑王者钓场', time: '2天前' },
    { rank: 2, user: { nickname: '张大钓', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11' }, fish: { species: '草鱼', weight: 15.2, unit: '斤' }, pond: '龙泉黑坑', time: '3天前' },
    { rank: 3, user: { nickname: '王老竿', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12' }, fish: { species: '青鱼', weight: 12.8, unit: '斤' }, pond: '顺义鱼塘', time: '1周前' },
    { rank: 4, user: { nickname: '赵小钓', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=13' }, fish: { species: '鲤鱼', weight: 11.3, unit: '斤' }, pond: '通州渔场', time: '5天前' },
    { rank: 5, user: { nickname: '钱塘钓手', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=14' }, fish: { species: '鲢鳙', weight: 10.5, unit: '斤' }, pond: '野钓-白洋淀', time: '2周前' },
  ],
  fishType: [
    { rank: 1, user: { nickname: '李钓神', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=20' }, fish: { species: '黑鱼', weight: 18.5, unit: '斤' }, pond: '黑坑王者钓场', time: '2天前' },
    { rank: 2, user: { nickname: '孙路亚', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=21' }, fish: { species: '黑鱼', weight: 16.8, unit: '斤' }, pond: '野钓-拒马河', time: '1周前' },
    { rank: 3, user: { nickname: '周小鱼', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=22' }, fish: { species: '黑鱼', weight: 14.2, unit: '斤' }, pond: '密云水库', time: '3天前' },
  ],
  weekly: [
    { rank: 1, user: { nickname: '张大钓', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=30' }, fish: { species: '草鱼', weight: 15.2, unit: '斤' }, pond: '龙泉黑坑', time: '3天前' },
    { rank: 2, user: { nickname: '李钓神', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=31' }, fish: { species: '黑鱼', weight: 12.5, unit: '斤' }, pond: '黑坑王者钓场', time: '昨天' },
    { rank: 3, user: { nickname: '吴新手', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=32' }, fish: { species: '鲫鱼', weight: 3.2, unit: '斤' }, pond: '公园池塘', time: '2天前' },
  ]
};

class Ranking extends Component {
  state = {
    currentTab: 'city'
  };

  handleTabChange = (tab) => {
    this.setState({ currentTab: tab });
  };

  getRankIcon(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  }

  render() {
    const { currentTab } = this.state;
    const list = mockRankings[currentTab] || [];

    return (
      <View className="ranking-page">
        {/* Tab 切换 */}
        <View className="tab-bar">
          <View 
            className={`tab ${currentTab === 'city' ? 'active' : ''}`}
            onClick={() => this.handleTabChange('city')}
          >
            城市榜
          </View>
          <View 
            className={`tab ${currentTab === 'fishType' ? 'active' : ''}`}
            onClick={() => this.handleTabChange('fishType')}
          >
            鱼种榜
          </View>
          <View 
            className={`tab ${currentTab === 'weekly' ? 'active' : ''}`}
            onClick={() => this.handleTabChange('weekly')}
          >
            本周榜
          </View>
        </View>

        {/* 排行榜内容 */}
        <ScrollView scrollY className="rank-list">
          {/* 冠军卡片 */}
          {list.length > 0 && (
            <View className="champion-card">
              <View className="champion-header">
                <Text className="champion-crown">👑</Text>
                <Text className="champion-title">本周冠军</Text>
              </View>
              <View className="champion-content">
                <Image src={list[0].user.avatar} className="champion-avatar" />
                <View className="champion-info">
                  <Text className="champion-name">{list[0].user.nickname}</Text>
                  <Text className="champion-fish">🐟 {list[0].fish.species} {list[0].fish.weight}{list[0].fish.unit}</Text>
                  <Text className="champion-pond">📍 {list[0].pond}</Text>
                </View>
              </View>
            </View>
          )}

          {/* 排名列表 */}
          <View className="rank-items">
            {list.map((item, index) => (
              <View key={index} className="rank-item">
                <View className="rank-left">
                  <Text className="rank-number">{this.getRankIcon(item.rank)}</Text>
                  <Image src={item.user.avatar} className="rank-avatar" />
                  <View className="rank-user-info">
                    <Text className="rank-name">{item.user.nickname}</Text>
                    <Text className="rank-fish">{item.fish.species} · {item.fish.weight}{item.fish.unit}</Text>
                  </View>
                </View>
                <View className="rank-right">
                  <Text className="rank-pond">{item.pond}</Text>
                  <Text className="rank-time">{item.time}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* 赛事入口 */}
          <View className="contest-banner">
            <View className="contest-content">
              <Text className="contest-icon">🏆</Text>
              <View className="contest-info">
                <Text className="contest-title">龙泉黑坑杯 - 春季赛</Text>
                <Text className="contest-desc">报名进行中 · 奖金 5000 元</Text>
              </View>
            </View>
            <Text className="contest-arrow">></Text>
          </View>

          {/* 鱼种分类入口 */}
          <View className="fish-type-grid">
            <Text className="grid-title">🏆 鱼种排行榜</Text>
            <View className="fish-grid">
              {['草鱼', '鲫鱼', '鲤鱼', '黑鱼', '鲢鳙', '青鱼', '鲈鱼', '翘嘴'].map((fish, idx) => (
                <View key={idx} className="fish-chip">
                  🐟 {fish}
                </View>
              ))}
            </View>
          </View>

          <View className="safe-bottom" />
        </ScrollView>
      </View>
    );
  }
}

export default Ranking;
