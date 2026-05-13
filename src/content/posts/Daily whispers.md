
---
title: Daily whispers
published: 2026-05-13
pinned: True
password: "ljt1111111111"
passwordHint: "密码四位数"
description: Daily whispers
image: ./cover.jpg
tags: [Daily whispers]
category: Daily whispers
draft: False
---
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">2024-01-15</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>发布第一篇文章</h3>
      <p>完成个人博客首篇文章，开启技术分享之旅。</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">2024-02-20</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>完成博客搭建</h3>
      <p>配置域名、主题优化、自动化部署上线。</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">2024-03-10</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>添加评论功能</h3>
      <p>集成 Giscus 评论系统，方便互动交流。</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">2024-04-05</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>优化移动端显示</h3>
      <p>响应式设计，提升移动端阅读体验。</p>
    </div>
  </div>
</div>

<style>
.timeline {
  max-width: 600px;
  margin: 20px auto;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  opacity: 0;
  animation: fadeInUp 0.4s ease forwards;
}

.timeline-item:nth-child(1) { animation-delay: 0.05s; }
.timeline-item:nth-child(2) { animation-delay: 0.1s; }
.timeline-item:nth-child(3) { animation-delay: 0.15s; }
.timeline-item:nth-child(4) { animation-delay: 0.2s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-date {
  width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
  flex-shrink: 0;
  padding-top: 4px;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  margin: 8px 16px 0 0;
  flex-shrink: 0;
  position: relative;
  transition: transform 0.2s;
}

.timeline-dot::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 4px;
  width: 2px;
  height: 40px;
  background: #e2e8f0;
}

.timeline-item:last-child .timeline-dot::before {
  display: none;
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
  background: #2563eb;
}

.timeline-content {
  flex: 1;
  padding: 8px 0;
  transition: transform 0.2s;
}

.timeline-content:hover {
  transform: translateX(5px);
}

.timeline-content h3 {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.timeline-content p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

@media (prefers-color-scheme: dark) {
  .timeline-date { color: #60a5fa; }
  .timeline-dot { background: #60a5fa; }
  .timeline-dot::before { background: #334155; }
  .timeline-content h3 { color: #f1f5f9; }
  .timeline-content p { color: #94a3b8; }
}

@media (max-width: 500px) {
  .timeline-date { width: 80px; font-size: 12px; }
  .timeline-content h3 { font-size: 14px; }
  .timeline-content p { font-size: 12px; }
}
</style>