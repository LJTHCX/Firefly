---
title: "[算法训练] ABC460-①多源BFS②欧几里得"
published: 2026-06-01
description: ABC457
image: ./cover.jpg
tags: [算法训练,AtCoder,ABC]
category: 算法训练
draft: False
---

# ABC460-多源BFS+欧几里得

[AtCoder Beginner Contest 460 - AtCoder](https://atcoder.jp/contests/abc460 "AtCoder Beginner Contest 460 - AtCoder")

Easy：A、B、C

Hard：D、E

</details>
<details> <summary>D-多源BFS</summary>

**题意：**

有一个H×W的网格，每个格子初始为白色(.)或黑色(#)。进行10^100次操作，每次操作同时对所有格子应用以下规则：

1. **白色格子**：如果其8邻域内至少有一个黑色格子，则变为黑色
2. **黑色格子**：变为白色

求10^100次操作后每个格子的颜色。

题解：

**第一步：先进行一次特殊操作**

- 不直接对原图进行BFS
- 而是先将原图进行一次变换：只有那些**初始为白色且8邻域中有黑色**的格子才被标记为黑色
- 这一步等价于"去掉孤立的黑色，只保留边界"

**第二步：对变换后的图进行多源BFS**

- 以变换后的黑色格子为源点
- 计算每个格子到最近黑色格子的切比雪夫距离
- **距离为偶数 → 白色(.)，距离为奇数 → 黑色(#)**

原始操作定义：

- 白色→黑色：当且仅当8邻域有黑色
- 黑色→白色：无条件

10^100次操作后（偶数次），相当于：

1. 首先"过滤"掉那些会立即变白的初始黑色（因为没有白色邻居的黑色会变成孤立的白色）
2. 然后黑色像"波"一样向外扩散，每次扩散一层
3. 偶数次操作后，波前扩散了偶数层，所以距离奇偶性决定最终颜色

想象黑色是"波源"：

- 第1步：原黑色变白，它们周围的白色变黑（波向外扩散1层）
- 第2步：新黑色变白，它们周围的白色变黑（波再扩散1层）
- ...
- 第k步：波扩散了k层

10^100是偶数，所以：

- 初始黑色的"波"扩散了偶数层
- 距离波源奇数层的格子最终是黑色
- 距离波源偶数层的格子最终是白色

但初始的孤立黑色（没有白色邻居）在第1步就变白了，不会成为波源。所以第一步要预处理，只保留有白色邻居的黑色作为波源。

```python title="Py"
from collections import deque

def solve():
    H, W = map(int, input().split())
    grid = [list(input().strip()) for _ in range(H)]
    
    # 8个方向
    dx = [1, 0, -1, 0, 1, -1, -1, 1]
    dy = [0, 1, 0, -1, 1, 1, -1, -1]
    
    def in_bounds(x, y):
        return 0 <= x < H and 0 <= y < W
    
    # 第一步：预处理，只保留有白色邻居的黑色
    new_grid = [['.'] * W for _ in range(H)]
    for i in range(H):
        for j in range(W):
            if grid[i][j] == '#':
                # 检查8邻域是否有白色
                for d in range(8):
                    nx, ny = i + dx[d], j + dy[d]
                    if in_bounds(nx, ny) and grid[nx][ny] == '.':
                        new_grid[nx][ny] = '#'
    
    grid = new_grid
    
    # 第二步：多源BFS计算距离
    INF = 10**9
    dist = [[INF] * W for _ in range(H)]
    q = deque()
    
    for i in range(H):
        for j in range(W):
            if grid[i][j] == '#':
                dist[i][j] = 0
                q.append((i, j))
    
    while q:
        x, y = q.popleft()
        for d in range(8):
            nx, ny = x + dx[d], y + dy[d]
            if in_bounds(nx, ny) and dist[nx][ny] == INF:
                dist[nx][ny] = dist[x][y] + 1
                q.append((nx, ny))
    
    # 第三步：根据距离奇偶性输出
    for i in range(H):
        row = []
        for j in range(W):
            if dist[i][j] % 2 == 0:
                row.append('.')
            else:
                row.append('#')
        print(''.join(row))

solve()
```


```c title="C"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXN 1000005

typedef struct {
    int x, y;
} Point;

Point q[MAXN];
int head, tail;

int H, W;
char grid[MAXN];
char new_grid[MAXN];
int dist[MAXN];

int dx[] = {1, 0, -1, 0, 1, -1, -1, 1};
int dy[] = {0, 1, 0, -1, 1, 1, -1, -1};

int idx(int i, int j) {
    return i * W + j;
}

int in_bounds(int x, int y) {
    return x >= 0 && x < H && y >= 0 && y < W;
}

void push(int x, int y) {
    q[tail].x = x;
    q[tail].y = y;
    tail++;
}

Point pop() {
    return q[head++];
}

int empty() {
    return head == tail;
}

int main() {
    scanf("%d %d", &H, &W);
    
    for (int i = 0; i < H; i++) {
        scanf("%s", grid + i * W);
    }
    
    // 第一步：预处理
    memset(new_grid, '.', sizeof(new_grid));
    
    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            if (grid[idx(i, j)] == '#') {
                for (int d = 0; d < 8; d++) {
                    int nx = i + dx[d];
                    int ny = j + dy[d];
                    if (in_bounds(nx, ny) && grid[idx(nx, ny)] == '.') {
                        new_grid[idx(nx, ny)] = '#';
                    }
                }
            }
        }
    }
    
    memcpy(grid, new_grid, sizeof(grid));
    
    // 第二步：BFS
    memset(dist, -1, sizeof(dist));
    head = tail = 0;
    
    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            if (grid[idx(i, j)] == '#') {
                dist[idx(i, j)] = 0;
                push(i, j);
            }
        }
    }
    
    while (!empty()) {
        Point p = pop();
        int x = p.x, y = p.y;
        
        for (int d = 0; d < 8; d++) {
            int nx = x + dx[d];
            int ny = y + dy[d];
            
            if (in_bounds(nx, ny) && dist[idx(nx, ny)] == -1) {
                dist[idx(nx, ny)] = dist[idx(x, y)] + 1;
                push(nx, ny);
            }
        }
    }
    
    // 第三步：输出
    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            int id = idx(i, j);
            if (dist[id] % 2 == 0) {
                printf(".");
            } else {
                printf("#");
            }
        }
        printf("\n");
    }
    
    return 0;
}
```

</details>
<details> <summary>E-欧几里得</summary>

题意：

定义 `concat(x,y)` 为将x和y的十进制表示拼接起来形成的整数。例如 `concat(123,45) = 12345`。

给定N和M，求有多少对正整数(x,y)，满足：

- 1 ≤ x ≤ N
- 1 ≤ y ≤ N
- `concat(x,y) ≡ x + y (mod M)`

有T个测试用例，需要对998244353取模。

题解：

数学推导：

- **数学公式推导**

  **一、基本定义与展开**

  设 $y$ 的十进制位数为 $k$，即 $10^{k-1} \leq y < 10^k$

  **拼接公式**：
  $$
  \text{concat}(x,y) = x \cdot 10^k + y
  $$
  **二、条件方程**
  $$
  \text{concat}(x,y) \equiv x + y \pmod M
  $$
  代入拼接公式：
  $$
  x \cdot 10^k + y \equiv x + y \pmod M
  $$
  **三、方程化简**

  两边同时减去 $y$：
  $$
  x \cdot 10^k \equiv x \pmod M
  $$
  移项：
  $$
  x \cdot 10^k - x \equiv 0 \pmod M
  $$
  提取公因子 $x$：
  $$
  x(10^k - 1) \equiv 0 \pmod M
  $$
  **四、模方程的标准形式**
  $$
  x(10^k - 1) \equiv 0 \pmod M
  $$
  这等价于：
  $$
  M \mid x(10^k - 1)
  $$
  即 $M$ 整除 $x(10^k - 1)$。

  **五、最大公约数化简**

  设：
  $$
  d_k = \gcd(M, 10^k - 1)
  $$
  由最大公约数定义，存在整数 $u_k, v_k$ 满足：
  $$
  M = d_k \cdot u_k, \quad 10^k - 1 = d_k \cdot v_k
  $$
  且 $\gcd(u_k, v_k) = 1$。

  **六、整除条件转化**
  $$
  M \mid x(10^k - 1) \iff d_k \cdot u_k \mid x \cdot d_k \cdot v_k
  $$
  两边约去 $d_k$：
  $$
  u_k \mid x \cdot v_k
  $$
  **七、互质性质的应用**

  由于 $\gcd(u_k, v_k) = 1$，由欧几里得引理：
  $$
  u_k \mid x \cdot v_k \text{ 且 } \gcd(u_k, v_k) = 1 \implies u_k \mid x
  $$
  **八、必要条件**
  $$
  u_k \mid x
  $$
  其中：
  $$
  u_k = \frac{M}{d_k} = \frac{M}{\gcd(M, 10^k - 1)}
  $$
  记 $g_k = u_k = \frac{M}{\gcd(M, 10^k - 1)}$，则：
  $$
  x \equiv 0 \pmod{g_k}
  $$
  **九、x的解集**
  $$
  x \in \{g_k, 2g_k, 3g_k, \ldots\} \cap [1, N]
  $$
  数量：
  $$
  C_x(k) = \left\lfloor \frac{N}{g_k} \right\rfloor
  $$
  **十、y的约束**

  $y$ 是 $k$ 位数且不超过 $N$：
  $$
  10^{k-1} \leq y \leq \min(10^k - 1, N)
  $$
  记：
  $$
  L_k = 10^{k-1}, \quad R_k = \min(10^k - 1, N)
  $$
  数量：
  $$
  C_y(k) = \max(0, R_k - L_k + 1)
  $$
  **十一、总答案**

  第 $k$ 组的贡献：
  $$
  A_k = C_x(k) \cdot C_y(k)
  $$
  总答案（模 $998244353$）：
  $$
  \text{Ans} = \sum_{k=1}^{\lfloor \log_{10} N \rfloor + 1} C_x(k) \cdot C_y(k) \pmod{998244353}
  $$
  **十二、公式总结**
  $$
  \boxed{\text{Ans} = \sum_{k=1}^{\lfloor \log_{10} N \rfloor + 1} \left\lfloor \frac{N}{M / \gcd(M, 10^k - 1)} \right\rfloor \cdot \max(0, \min(10^k - 1, N) - 10^{k-1} + 1)}
  $$

```python title="py"
MOD = 998244353
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a
T = int(input())
# 预计算10的幂
pow10 = [1]
for i in range(1, 19):
    pow10.append(pow10[-1] * 10)
for _ in range(T):
    N, M = map(int, input().split())
    # N的位数
    len_N = len(str(N))
    ans = 0
    for k in range(1, len_N + 1):
        # 计算gcd和g
        d = gcd(M, pow10[k] - 1)
        g = M // d
        # x的个数
        cnt_x = N // g
        if cnt_x == 0:
            continue
        # y的范围：k位数，且≤N
        L = pow10[k - 1]  # 最小k位数
        R = min(N, pow10[k] - 1)  # 最大k位数
        if L > R:
            continue
        cnt_y = R - L + 1
        ans = (ans + cnt_x % MOD * (cnt_y % MOD)) % MOD
    print(ans % MOD)
```
