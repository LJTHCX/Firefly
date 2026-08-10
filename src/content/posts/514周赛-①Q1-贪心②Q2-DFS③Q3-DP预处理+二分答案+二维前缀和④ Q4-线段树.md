---
title: "[算法训练] 514周赛-①Q1-贪心②Q2-DFS③Q3-DP预处理+二分答案+二维前缀和④Q4-线段树"
published: 2026-08-10
description: LeetCode514周赛
image: ./cover.jpg
tags: [算法训练,LeetCode周赛]
category: 算法训练
draft: False
---

# 514周赛-①Q1-贪心②Q2-DFS③Q3-DP预处理+二分答案+二维前缀和④Q4-线段树

[第 514 场周赛 - 力扣（LeetCode）](https://leetcode.cn/contest/weekly-contest-514/ "第 514 场周赛 - 力扣（LeetCode）")

### Q1-贪心

#### 题目

给你两个整数数组 `prices` 和 `discounts`。

`prices[i]` 表示第 `ith` 件商品的价格，`discounts[j]` 表示一个折扣百分比。

你可以按照以下规则使用折扣：

- 每个折扣**最多** 只能用于一件商品。
- 每件商品 **最多** 只能使用一个折扣。
- 商品也可以不使用任何折扣。

如果将 `d`% 的折扣应用于价格为 `p` 的商品，则其最终价格为 `(p * (100 - d)) / 100`。最终价格 **不进行四舍五入** 。

请以最优方式分配折扣，并返回所有商品最终价格之和的**最小值** 。与实际答案的误差在 `10-5` 以内的结果都将被接受。

#### 贪心

最优的做法是把最大的折扣用在最贵的商品上，证明方法为排序不等式

```python title="贪心"
class Solution:
    def minPrice(self, a: list[int], b: list[int]) -> float:
        a.sort(reverse = True)
        b.sort(reverse = True)
        ans = 0
        n,m = len(a),len(b)
        for i in range(n):
            if i < m:
                ans += a[i]*(100 - b[i])
            else:
                ans += a[i]*100
        return ans/100
```


```c++ title="贪心"
class Solution {
public:
    double minPrice(vector<int>& prices, vector<int>& discounts) {
        sort(prices.begin(),prices.end(),greater<int>());
        sort(discounts.begin(),discounts.end(),greater<int>());
        long long ans = 0;
        for(int i = 0;i < prices.size();i++){
            if(i < discounts.size()){
                ans += prices[i]*(100 - discounts[i]);
            }
            else{
                ans += prices[i]*100;
            }
        }
        return double(ans/100.0);
    }
};
```


### Q2-DFS

#### 题目

给你一个长度为 `n` 的整数数组 `parent`，它表示一棵根节点编号为 0、节点编号范围为 0 到 `n - 1` 的有根树。

该树以节点 0 为 **根节点**，因此 `parent[0] = -1`。对于每个满足 `1 <= i <= n - 1` 的节点 `i`，`parent[i]` 表示节点 `i` 的父节点。

另给定一个长度为 `n` 的整数数组 `nums`，其中 `nums[i]` 表示节点 `i` 的值。

对于深度为 `d` 的节点 `i`，其 **权重** 定义为 `nums[i] * (h - d + 1)`，其中 `h` 表示树的高度。

返回树中所有节点的 **权重之和** 。

节点的 **深度** 定义为从根节点到该节点的路径上包含的节点数量，其中根节点的深度为 1。

树的 **高度** 定义为所有节点深度的最大值。

#### DFS

```c++ title="DFS"
class Solution {
public:
    long long weightedSum(vector<int>& parent, vector<int>& nums) {
        int n = parent.size();
        vector<vector<int>> g(n);
        for (int i = 1; i < n; i++) {
            g[parent[i]].push_back(i);
        }
        vector<int> depth(n);

        auto dfs = [&](this auto&& dfs, int x) -> int {
            int h = 0;
            for (int y : g[x]) {
                depth[y] = depth[x] + 1;
                h = max(h, dfs(y));
            }
            return h + 1;
        };
        int h = dfs(0);

        long long ans = 0;
        for (int i = 0; i < n; i++) {
            ans += 1LL * nums[i] * (h - depth[i]);
        }
        return ans;
    }
};
```


```python title="DFS"
class Solution:
    def weightedSum(self, parent: list[int], nums: list[int]) -> int:
        # 二叉树的最大深度
        n = len(nums)
        g = [[] for _ in range(n)]
        for i in range(1,n):
            g[parent[i]].append(i)
        d = [0]*n
        def dfs(node):
            for gg in g[node]:
                d[gg] = d[node] + 1
                dfs(gg)
        dfs(0)
        h = max(d)
        ans = 0
        for i in range(n):
            ans += nums[i]*(h - d[i] + 1)
        return ans
```


### BFS

```c++ title="BFS"
class Solution {
public:
    long long weightedSum(vector<int>& parent, vector<int>& nums) {
        int n = nums.size();
        vector<int> depth(n);
        vector<vector<int>> g(n);
        for(int i = 1;i < n;i++){
            g[parent[i]].push_back(i);
        }
        int h = 1;
        depth[0] = 1;
        queue<int> q;
        q.push(0);
        while(!q.empty()){
            int u = q.front();
            q.pop();
            for(int v : g[u]){
                if(depth[u] + 1 > depth[v]){
                    depth[v] = depth[u] + 1;
                    q.push(v);
                    h = max(h,depth[v]);
                }
            }
        }
        long long ans = 0;
        for(int i = 0;i < n;i++){
            ans += 1LL * nums[i] *(h - depth[i] + 1);
        }
        return ans;
    }
};
```


```c++ title="BFS"
class Solution:
    def weightedSum(self, parent: list[int], nums: list[int]) -> int:
        n = len(nums)
        g = [[] for _ in range(n)]
        for i in range(1,n):
            g[parent[i]].append(i)
        
        d = [0]*n
        d[0] = 1
        q = deque([0])
        h = 1
        while q:
            u = q.popleft()
            for v in g[u]:
                d[v] = d[u] + 1
                h = max(h,d[v])
                q.append(v)
        ans = 0
        for i in range(n):
            ans += nums[i] * (h - d[i] + 1)
        return ans
```


### Q3-DP预处理+二分答案+二维前缀和

#### 题目

给你一个大小为 `m × n` 的二维整数矩阵 `mat`，其中：

- `mat[r][c] == 1` 表示位于行 `r` 和列 `c` 的单元格是可用的。
- `mat[r][c] == 0` 表示它不可用。

你的任务是找到满足以下条件的**两个子矩阵** ：

- 这两个子矩阵都必须是边长为 `k` 的正方形。
- 这两个子矩阵不能共享任何单元格。
- 每个子矩阵只能覆盖 `mat[r][c] == 1` 的单元格。

返回单个正方形的最大可能面积。如果无法选择两个这样的正方形，则返回 0。

一个**子矩阵** `(x1, y1, x2, y2)` 包括所有满足 `x1 <= x <= x2` 且 `y1 <= y <= y2` 的单元格 `mat[x][y]` 。

#### 二分答案+二维前缀和

**如何快速判断某个位置能否放下边长为 k 的全1正方形？**

用 DP 预处理：`dp[i][j]` 表示以 `(i,j)` 为右下角的最大全1正方形边长

则 `(i,j)` 作为左上角能放下边长为 k 的正方形 ⇔ `dp[i+k-1][j+k-1] >= k`

**如何判断两个正方形不重叠？**

两个矩形不重叠 ⇔ 一个在另一个的**上/下/左/右**方

即：存在一条水平或垂直的线将它们分开

**如何快速判断某个区域内是否存在至少一个合法正方形？**

用二维前缀和标记所有合法的左上角位置

任意矩形区域内的合法正方形数量可在 O(1) 内查询

```python title="二分答案+二维前缀和"
class Solution:
    def maxArea(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        dp = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if mat[i][j] == 1:
                    if i == 0 or j == 0:
                        dp[i][j] = 1
                    else:
                        dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
        
        def f(k: int) -> bool:
            if k == 0:
                return True
            
            # 标记合法左上角
            can = [[0] * n for _ in range(m)]
            for i in range(m - k + 1):
                for j in range(n - k + 1):
                    if dp[i + k - 1][j + k - 1] >= k:
                        can[i][j] = 1
            
            # 二维前缀和
            pre = [[0] * (n + 1) for _ in range(m + 1)]
            for i in range(m):
                row_sum = 0
                for j in range(n):
                    row_sum += can[i][j]
                    pre[i+1][j+1] = pre[i][j+1] + row_sum
            
            # 查询矩形内是否有合法正方形
            def ok(r1: int, c1: int, r2: int, c2: int) -> bool:
                if r1 > r2 or c1 > c2:
                    return False
                r1, c1 = max(r1, 0), max(c1, 0)
                r2, c2 = min(r2, m - 1), min(c2, n - 1)
                if r1 > r2 or c1 > c2:
                    return False
                return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1] > 0
            
            # 检查是否存在两个不重叠的正方形
            for i in range(m - k + 1):
                for j in range(n - k + 1):
                    if not can[i][j]:
                        continue

                    if ok(0, 0, i - k, n - 1):      # 上方
                        return True
                    if ok(i + k, 0, m - 1, n - 1):  # 下方
                        return True
                    if ok(0, 0, m - 1, j - k):      # 左方
                        return True
                    if ok(0, j + k, m - 1, n - 1):  # 右方
                        return True
            return False
        
        # 二分搜索最大边长
        l, r = 0, min(m, n) + 1
        while l + 1 < r:
            mid = (l + r) // 2
            if f(mid):
                l = mid
            else:
                r = mid
        return l * l
```


```c++ title="c++"
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<vector<int>>& mat) {
        int m = mat.size();
        int n = mat[0].size();
        
        // DP 预处理：以 (i,j) 为右下角的最大全1正方形边长
        vector<vector<int>> dp(m, vector<int>(n, 0));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1) {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1;
                    } else {
                        dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
                    }
                }
            }
        }
        
        // 判定函数：能否放置两个边长为 k 的不重叠全1正方形
        auto f = [&](int k) -> bool {
            if (k == 0) return true;
            
            // 标记合法左上角
            vector<vector<int>> can(m, vector<int>(n, 0));
            for (int i = 0; i <= m - k; i++) {
                for (int j = 0; j <= n - k; j++) {
                    if (dp[i + k - 1][j + k - 1] >= k) {
                        can[i][j] = 1;
                    }
                }
            }
            
            // 二维前缀和
            vector<vector<int>> pre(m + 1, vector<int>(n + 1, 0));
            for (int i = 0; i < m; i++) {
                int row_sum = 0;
                for (int j = 0; j < n; j++) {
                    row_sum += can[i][j];
                    pre[i + 1][j + 1] = pre[i][j + 1] + row_sum;
                }
            }
            
            // 查询矩形 (r1,c1) 到 (r2,c2) 内是否有合法正方形
            auto ok = [&](int r1, int c1, int r2, int c2) -> bool {
                if (r1 > r2 || c1 > c2) return false;
                r1 = max(r1, 0);
                c1 = max(c1, 0);
                r2 = min(r2, m - 1);
                c2 = min(c2, n - 1);
                if (r1 > r2 || c1 > c2) return false;
                return pre[r2 + 1][c2 + 1] - pre[r1][c2 + 1] - pre[r2 + 1][c1] + pre[r1][c1] > 0;
            };
            
            // 检查是否存在两个不重叠的正方形
            for (int i = 0; i <= m - k; i++) {
                for (int j = 0; j <= n - k; j++) {
                    if (!can[i][j]) continue;
                    
                    if (ok(0, 0, i - k, n - 1)) return true;      // 上方
                    if (ok(i + k, 0, m - 1, n - 1)) return true;  // 下方
                    if (ok(0, 0, m - 1, j - k)) return true;      // 左方
                    if (ok(0, j + k, m - 1, n - 1)) return true;  // 右方
                }
            }
            return false;
        };
        
        // 二分搜索最大边长
        int l = 0, r = min(m, n) + 1;
        while (l + 1 < r) {
            int mid = (l + r) / 2;
            if (f(mid)) {
                l = mid;
            } else {
                r = mid;
            }
        }
        
        return l * l;
    }
};
```


### Q4-线段树

####

####
