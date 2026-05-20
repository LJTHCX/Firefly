---
title: Name of Water
published: 2026-04-01
password: "0823"
passwordHint: "密码是四位数,其实很简单,前两位不超过12,后两位不超过31"
description: Name of Water
image: ./cover.jpg
tags: [Whispers]
category: Whispers
draft: False

---

<div class="timeline">

  <div class="timeline-item">
    <div class="timeline-date">2005-07-21</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>来到这世间</h3>
      <p>开启地球online副本</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-date">2020-07-12</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>中考</h3>
      <p>581+农村专项40分进入县重点</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-date">2023-06-07</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>高考</h3>
      <p>571分进入苏州科技大学</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-date">2025-05-08</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>句号</h3>
      <p>向TA表明心意,受到拒绝,前18年的所有故事画上句号</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-date">2025-05-08</div>
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <h3>未完待续...</h3>
      <p>我还活着</p>
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
  background: #2e2f30;
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
  .timeline-content h3 { color: #181819; }
  .timeline-content p { color: #94a3b8; }
}

@media (max-width: 500px) {
  .timeline-date { width: 80px; font-size: 12px; }
  .timeline-content h3 { font-size: 14px; }
  .timeline-content p { font-size: 12px; }
}
</style>