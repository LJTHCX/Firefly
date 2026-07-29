---
title: 186双周赛-①Q1-枚举②Q2-贪心/状态机DP③前缀和优化DP
published: 2026-07-05
description: LeetCode186双周赛
image: ./cover.jpg
tags: [算法训练,LeetCode周赛]
category: 算法训练
draft: False
---

# 186双周赛-①Q1-枚举②Q2-贪心/状态机DP③前缀和优化DP

[第 186 场双周赛 - 力扣（LeetCode）](https://leetcode.cn/contest/biweekly-contest-186/ "第 186 场双周赛 - 力扣（LeetCode）")

[https://www.wolai.com/bffX1CFhNVx9JdE1PHrb8g](https://www.wolai.com/bffX1CFhNVx9JdE1PHrb8g "https://www.wolai.com/bffX1CFhNVx9JdE1PHrb8g")

### Q2-枚举

#### 题意

给你一个长度为 `n` 的整数数组 `nums` 和一个整数 `k` 。

如果满足以下条件，则下标对 `(i, j)` 被称为**有效** 的：

- `0 <= i < j < n`
- `j - i >= k`

返回所有有效对中的 `nums[i] + nums[j]` 的**最大** 值。

#### 枚举

枚举右，维护左，枚举的过程中维护`nums[j-k]`的最大值

```python title="枚举"
class Solution:
    def maxValidPairSum(self, nums: list[int], k: int) -> int:
        ans = -inf
        pre = nums[0]
        for j in range(k,len(nums)):
            pre = max(pre,nums[j - k])
            ans = max(ans,pre + nums[j])
        return ans
```


```c++ title="枚举"
class Solution {
public:
    int maxValidPairSum(vector<int>& nums, int k) {
        int ans = 0,mx = 0;
        for(int j = k;j < nums.size();j++){
            mx = max(mx,nums[j-k]);
            ans = max(ans,mx + nums[j]);
        }
        return ans;
    }
};
```


### Q3-贪心/状态机DP

#### 题意

给你两个长度同为 `n` 的二进制字符串 `s1` 和 `s2` 。

你可以对 `s1`以任意顺序执行以下操作**任意** 次：

- 选择一个满足 `s1[i]` 为 `'0'` 的下标 `i` ，并将其更改为 `'1'` 。
- 选择一个满足 `0 <= i < n - 1` 且 `s1[i]` 和 `s1[i + 1]` 均为 `'1'` 的下标 `i` 。将这两个字符都更改为 `'0'` 。

返回使 `s1` **等于** `s2` 所需的**最小** 操作次数。如果无法使 `s1` 等于 `s2` ，则返回 -1 。

#### 贪心

[灵神题解](https://leetcode.cn/problems/minimum-operations-to-transform-binary-string/solutions/3991773/cong-zuo-dao-you-tan-xin-pythonjavacgo-b-yx03/ "灵神题解")

```python title="贪心"
class Solution:
    def minOperations(self, s1: str, t: str) -> int:
        n = len(s1)
        if n == 1 and s1[0] == '1' and t == '0':
            return -1
        s = list(s1)
        ans = 0
        for i in range(n):
            if s[i] == t[i]:
                continue
            if s[i] == '0':
                ans += 1
            elif i < n - 1 and s[i+1] == '1':
                ans += 1
                s[i+1] = '0'
            else:
                ans += 2
        return ans
        
```


```c++ title="贪心"
class Solution {
public:
    int minOperations(string s, string t) {
        int n = s.size();
        if (n == 1 && s == "1" && t == "0") {
            return -1;
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == t[i]) {
                continue;
            }
            if (s[i] == '0') {
                ans++;
            } else if (i < n - 1 && s[i + 1] == '1') {
                ans++;
                s[i + 1] = '0';
            } else {
                ans += 2;
            }
        }
        return ans;
    }
};
```


#### 状态机DP

```python title="状态机DP"
class Solution:
    def minOperations(self, s1: str, s2: str) -> int:
        n = len(s1)
        s1 = list(s1)
        s2 = list(s2)
        if n == 1:
            if s1 == s2:
                return 0
            return 1 if s1[0] == '0' and s2[0] == '1' else -1
        d = [int(s2[i]) - int(s1[i]) for i in range(n)]
        c2 = [0]*(n - 1)
        c2[-1] = max(0,-d[-1])
        for i in range(n-3,-1,-1):
            c2[i] = max(0,-d[i+1] - c2[i+1])
        c2[0] = max(c2[0],-d[0])
        return sum(d) + 3 * sum(c2)
        
```


#### Q4-前缀和优化DP
