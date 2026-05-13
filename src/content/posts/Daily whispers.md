
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
<div class="timeline-simple">
  <div class="timeline-card">
    <span class="date-badge">2024-01-15</span>
    <span class="event-title">发布第一篇文章</span>
    <p>完成了个人博客的首篇文章记录</p>
  </div>
  <div class="timeline-card">
    <span class="date-badge">2024-02-20</span>
    <span class="event-title">完成博客搭建</span>
    <p>配置域名、主题优化、部署上线</p>
  </div>
</div>

<style>
.timeline-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.timeline-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.25);
}

.date-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.25);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  margin-right: 12px;
}

.event-title {
  font-weight: bold;
  color: white;
  font-size: 16px;
}

.timeline-card p {
  color: rgba(255, 255, 255, 0.9);
  margin: 8px 0 0 0;
  font-size: 14px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-card:nth-child(1) { animation-delay: 0.1s; }
.timeline-card:nth-child(2) { animation-delay: 0.2s; }
.timeline-card:nth-child(3) { animation-delay: 0.3s; }
.timeline-card:nth-child(4) { animation-delay: 0.4s; }
</style>