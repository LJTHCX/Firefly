---
title: "[算法训练] 509周赛-①Q1-枚举②Q2-状态机DP/前后缀分解③枚举质因子/线段树/前缀和④Manacher"
published: 2026-07-05
description: LeetCode509周赛
image: ./cover.jpg
tags: [算法训练,LeetCode周赛]
category: 算法训练
draft: False
---

# 509周赛-①Q1-枚举②Q2-状态机DP/前后缀分解③枚举质因子/线段树/前缀和④Manacher

[第 509 场周赛 - 力扣（LeetCode）](https://leetcode.cn/contest/weekly-contest-509/ "第 509 场周赛 - 力扣（LeetCode）")

[https://www.wolai.com/3pmBJmhrQpNaYijzj3Avkr](https://www.wolai.com/3pmBJmhrQpNaYijzj3Avkr "https://www.wolai.com/3pmBJmhrQpNaYijzj3Avkr")

### Q1-枚举

#### 题意

给你一个整数数组 `nums`。

一个整数的**数字范围** 定义为其 **最大**数字与 **最小** 数字之间的差。

例如，5724 的数字范围为 `7 - 2 = 5`。

返回 `nums` 中所有**数字范围** 等于数组中**最大数字范围** 的整数之和。

#### 枚举

```python title="枚举"
class Solution:
    def maxDigitRange(self, nums: list[int]) -> int:
        def f(num):
            s = str(num)
            return int(max(s)) - int(min(s))
        max_ = max(f(num) for num in nums)
        return sum(num for num in nums if f(num) == max_)
```


```python title="一次遍历"

```


### Q2-状态机DP/前后缀分解

#### 题意

给你两个由小写英文字母组成的字符串 `s` 和 `t`。

你最多可以选择 `s` 中的一个下标，并将该下标处的字符 **替换** 为任意小写英文字母。

如果可以使 `s` 成为 `t` 的一个 **子序列**，则返回 `true`；否则返回 `false`。

**子序列** 是指通过删除另一个字符串中的某些字符或不删除任何字符，并且不改变剩余字符相对顺序后得到的字符串。

#### 前后缀分解

枚举修改的下标 i=0,1,2…,∣s∣−1，我们需要知道：

看左边，设 s 的前缀 \[0,i−1] 是 t 的前缀 \[0,pre\[i−1]] 的子序列。
看右边，设 s 的后缀 \[i+1,∣s∣−1] 是 t 的后缀 \[suf\[i+1],∣t∣−1] 的子序列。
如果 pre\[i−1] 和 suf\[i+1] 之间至少有一个下标 j，也就是 suf\[i+1]−pre\[i−1]>1，那么就可以把 s\[i] 改成 t\[j]，使 s 是 t 的子序列。
所以 pre\[i−1] 越小越好，suf\[i+1] 越大越好。

```python title="前后缀分解"
class Solution:
    def canMakeSubsequence(self, s: str, t: str) -> bool:
        n, m = len(s), len(t)
        suf = [0] * (n + 1)
        suf[n] = m
        j = m
        for i in range(n - 1, -1, -1):
            j -= 1
            while j >= 0 and t[j] != s[i]:
                j -= 1
            suf[i] = j
        if suf[0] >= 0:
            return True
        pre = -1
        for i, ch in enumerate(s):
            if suf[i + 1] - pre > 1:
                return True
            pre += 1
            while pre < m and t[pre] != ch:
                pre += 1
        return False
```


#### 状态机DP

### Q3-枚举质因子/线段树/前缀和

[3984. 可整除游戏 - 力扣（LeetCode）](https://leetcode.cn/problems/divisible-game/solutions/3991837/mei-ju-yin-zi-ji-suan-zui-da-zi-shu-zu-h-ph5x/ "3984. 可整除游戏 - 力扣（LeetCode）")

### Q4-**Manacher**

[3985. 回文子数组求和 - 力扣（LeetCode）](https://leetcode.cn/problems/palindromic-subarray-sum/solutions/3991856/mo-ban-manacher-suan-fa-qian-zhui-he-pyt-d917/ "3985. 回文子数组求和 - 力扣（LeetCode）")
