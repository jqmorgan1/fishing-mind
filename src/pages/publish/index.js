import { Component } from 'react';
import { View, Text, Image, Input, Textarea, Button, Picker } from '@tarojs/components';
import './index.css';

const fishSpecies = ['草鱼', '鲫鱼', '鲤鱼', '黑鱼', '鲢鳙', '青鱼', '鲈鱼', '翘嘴', '罗非鱼', '黄鳝', '鳜鱼', '其他'];
const fishingMethods = ['台钓', '路亚', '筏钓', '矶钓', '手竿', '抛竿', '其他'];

class Publish extends Component {
  state = {
    step: 1,
    photos: [],
    fishSpeciesIndex: 0,
    weight: '',
    weightUnit: '斤',
    bait: '',
    methodIndex: 0,
    notes: '',
    locationName: '',
    isPrivate: false
  };

  handleStep1 = () => {
    // 模拟选择照片
    const mockPhotos = ['https://picsum.photos/400/300?random=10'];
    this.setState({ photos: mockPhotos, step: 2 });
  };

  handleStep2 = () => {
    this.setState({ step: 3 });
  };

  handleStep3 = () => {
    this.setState({ step: 4 });
  };

  handlePublish = () => {
    // 提交战绩
    console.log('发布战绩:', this.state);
    if (typeof window !== 'undefined') {
      alert('发布成功！');
      window.location.hash = '#/pages/home/index';
    }
  };

  onWeightChange = (e) => {
    this.setState({ weight: e.detail.value });
  };

  onFishSpeciesChange = (e) => {
    this.setState({ fishSpeciesIndex: e.detail.value });
  };

  onMethodChange = (e) => {
    this.setState({ methodIndex: e.detail.value });
  };

  onNotesChange = (e) => {
    this.setState({ notes: e.detail.value });
  };

  render() {
    const { step, photos, fishSpeciesIndex, weight, weightUnit, bait, methodIndex, notes, isPrivate } = this.state;

    return (
      <View className="publish-page">
        {/* 顶部进度 */}
        <View className="progress-bar">
          <View className={`step ${step >= 1 ? 'active' : ''}`}>
            <View className="step-circle">1</View>
            <Text className="step-text">拍照</Text>
          </View>
          <View className={`step-line ${step >= 2 ? 'active' : ''}`} />
          <View className={`step ${step >= 2 ? 'active' : ''}`}>
            <View className="step-circle">2</View>
            <Text className="step-text">信息</Text>
          </View>
          <View className={`step-line ${step >= 3 ? 'active' : ''}`} />
          <View className={`step ${step >= 3 ? 'active' : ''}`}>
            <View className="step-circle">3</View>
            <Text className="step-text">钓点</Text>
          </View>
          <View className={`step-line ${step >= 4 ? 'active' : ''}`} />
          <View className={`step ${step >= 4 ? 'active' : ''}`}>
            <View className="step-circle">4</View>
            <Text className="step-text">发布</Text>
          </View>
        </View>

        {/* 步骤1：拍照 */}
        {step === 1 && (
          <View className="step-content">
            <View className="photo-area" onClick={this.handleStep1}>
              {photos.length === 0 ? (
                <View className="photo-placeholder">
                  <Text className="photo-icon">📷</Text>
                  <Text className="photo-text">点击拍照或从相册选择</Text>
                  <Text className="photo-hint">最多3张照片</Text>
                </View>
              ) : (
                <View className="photo-preview">
                  <Image src={photos[0]} className="preview-img" mode="aspectFill" />
                  <View className="photo-mask">
                    <Text className="photo-edit">✏️ 修改照片</Text>
                  </View>
                </View>
              )}
            </View>

            <View className="action-buttons">
              <Button className="btn-primary" onClick={this.handleStep1}>
                {photos.length === 0 ? '选择照片' : '下一步'}
              </Button>
            </View>
          </View>
        )}

        {/* 步骤2：填写信息 */}
        {step === 2 && (
          <View className="step-content">
            <View className="form-group">
              <Text className="form-label">鱼种 *</Text>
              <Picker mode="selector" range={fishSpecies} onChange={this.onFishSpeciesChange}>
                <View className="picker-value">
                  {fishSpecies[fishSpeciesIndex]} ▼
                </View>
              </Picker>
            </View>

            <View className="form-group">
              <Text className="form-label">重量 *</Text>
              <View className="weight-input">
                <Input 
                  type="digit" 
                  placeholder="请输入重量" 
                  value={weight}
                  onInput={this.onWeightChange}
                  className="input"
                />
                <Picker mode="selector" range={['斤', 'kg', 'lbs']}>
                  <View className="unit-select">{weightUnit} ▼</View>
                </Picker>
              </View>
            </View>

            <View className="form-group">
              <Text className="form-label">用饵（可选）</Text>
              <Input 
                placeholder="如：老鬼918、红虫" 
                value={bait}
                className="input"
              />
            </View>

            <View className="form-group">
              <Text className="form-label">钓法 *</Text>
              <Picker mode="selector" range={fishingMethods} onChange={this.onMethodChange}>
                <View className="picker-value">
                  {fishingMethods[methodIndex]} ▼
                </View>
              </Picker>
            </View>

            <View className="form-group">
              <Text className="form-label">心得（可选）</Text>
              <Textarea 
                placeholder="记录这次钓鱼的感受..." 
                value={notes}
                onInput={this.onNotesChange}
                className="textarea"
                maxlength={200}
              />
            </View>

            <View className="action-buttons">
              <Button className="btn-default" onClick={() => this.setState({ step: 1 })}>上一步</Button>
              <Button className="btn-primary" onClick={this.handleStep2}>下一步</Button>
            </View>
          </View>
        )}

        {/* 步骤3：选择钓点 */}
        {step === 3 && (
          <View className="step-content">
            <View className="location-section">
              <Text className="section-title">选择鱼塘</Text>
              <View className="location-list">
                <View className="location-item selected">
                  <View className="location-info">
                    <Text className="location-name">龙泉黑坑</Text>
                    <Text className="location-addr">北京市朝阳区 · 距我3.2km</Text>
                  </View>
                  <Text className="check-icon">✓</Text>
                </View>
                <View className="location-item">
                  <View className="location-info">
                    <Text className="location-name">野钓-苏州河</Text>
                    <Text className="location-addr">野钓地点</Text>
                  </View>
                  <Text className="check-icon">○</Text>
                </View>
              </View>
            </View>

            <View className="map-placeholder">
              <Text className="map-icon">🗺️</Text>
              <Text className="map-text">地图组件占位</Text>
              <Text className="map-hint">点击地图打点可添加野钓位置</Text>
            </View>

            <View className="action-buttons">
              <Button className="btn-default" onClick={() => this.setState({ step: 2 })}>上一步</Button>
              <Button className="btn-primary" onClick={this.handleStep3}>下一步</Button>
            </View>
          </View>
        )}

        {/* 步骤4：发布 */}
        {step === 4 && (
          <View className="step-content">
            <View className="preview-card">
              <Text className="preview-title">📸 战绩预览</Text>
              
              {photos.length > 0 && (
                <Image src={photos[0]} className="preview-photo" mode="aspectFill" />
              )}

              <View className="preview-info">
                <View className="preview-row">
                  <Text className="preview-label">鱼种：</Text>
                  <Text className="preview-value">{fishSpecies[fishSpeciesIndex]}</Text>
                </View>
                <View className="preview-row">
                  <Text className="preview-label">重量：</Text>
                  <Text className="preview-value highlight">{weight} {weightUnit}</Text>
                </View>
                <View className="preview-row">
                  <Text className="preview-label">钓法：</Text>
                  <Text className="preview-value">{fishingMethods[methodIndex]}</Text>
                </View>
                {bait && (
                  <View className="preview-row">
                    <Text className="preview-label">用饵：</Text>
                    <Text className="preview-value">{bait}</Text>
                  </View>
                )}
                <View className="preview-row">
                  <Text className="preview-label">钓点：</Text>
                  <Text className="preview-value">龙泉黑坑</Text>
                </View>
                {notes && (
                  <View className="preview-row">
                    <Text className="preview-label">心得：</Text>
                    <Text className="preview-value">{notes}</Text>
                  </View>
                )}
              </View>

              <View className="private-toggle">
                <View 
                  className={`toggle-btn ${isPrivate ? 'active' : ''}`}
                  onClick={() => this.setState({ isPrivate: !isPrivate })}
                >
                  {isPrivate ? '🔒' : '🌍'} {isPrivate ? '仅自己可见' : '公开分享'}
                </View>
              </View>
            </View>

            <View className="action-buttons">
              <Button className="btn-default" onClick={() => this.setState({ step: 3 })}>上一步</Button>
              <Button className="btn-publish" onClick={this.handlePublish}>🎣 发布战绩</Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Publish;
