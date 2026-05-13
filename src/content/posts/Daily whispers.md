
---
title: Daily whispers
published: 2026-05-13
pinned: True
password: "0823"
passwordHint: "密码四位数"
description: Daily whispers
image: ./cover.jpg
tags: [Daily whispers]
category: Daily whispers
draft: False
---
<div class="timeline-alternate">
  <div class="timeline-block">
    <div class="timeline-icon"></div>
    <div class="timeline-content-left">
      <span class="date">2025-05-12</span>
      <h4>发布第一篇文章</h4>
      <p>月寒日暖,来煎人寿</p>
    </div>
  </div>
  <div class="timeline-block">
    <div class="timeline-icon"></div>
    <div class="timeline-content-right">
      <span class="date">2024-05-13</span>
      <h4>完成博客搭建</h4>
      <p>无岁不逢春</p>
    </div>
  </div>
</div>

<style>
.timeline-alternate {
  position: relative;
  padding: 20px 0;
}

.timeline-alternate::before {
  content: '';
  position: absolute;
  left: 50%;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  transform: translateX(-50%);
}

.timeline-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

.timeline-block:nth-child(odd) { animation-delay: 0.1s; }
.timeline-block:nth-child(even) { animation-delay: 0.2s; }

@keyframes fadeIn {
  to { opacity: 1; }
}

.timeline-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: #f8fafc;
  transition: all 0.3s ease;
  z-index: 1;
}

.timeline-block:hover .timeline-icon {
  transform: translateX(-50%) scale(1.1);
  border-color: #8b5cf6;
  background: #8b5cf6;
}

.timeline-content-left,
.timeline-content-right {
  width: 45%;
  padding: 16px 20px;
  background: #f1f5f9;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.timeline-content-left { margin-right: 55%; }
.timeline-content-right { margin-left: 55%; }

.timeline-content-left:hover,
.timeline-content-right:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background: #e2e8f0;
}

@media (max-width: 768px) {
  .timeline-alternate::before { left: 20px; }
  .timeline-icon { left: 20px; }
  .timeline-content-left,
  .timeline-content-right {
    width: calc(100% - 60px);
    margin-left: 60px !important;
    margin-right: 0 !important;
  }
}
</style>