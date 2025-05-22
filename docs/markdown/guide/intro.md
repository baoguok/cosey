# 关于 Cosey Admin

Cosey 是一个基于 Vue3、Vite、TypeScript 的后台解决方案，专门为开发中大型项目提供开箱即用的基础框架，让您可以专心于业务逻辑的开发。

Cosey 封装了页面布局、路由菜单、接口请求、核心全局状态管理、菜单和按钮级别的权限管理、主题，并提供了大量的组件和工具，绝对让您从项目搭建到部署都做到省心省时省力。

像有些后台框架需要从 github 下载项目源码，网络慢不说，升级时还容易造成代码冲突。使用 Cosey 就没有这种问题。

Cosey 以包的形式发布到 npm 上，包括创建项目时使用的 `create-cosey` 包和运行时使用的 `cosey` 包。你可以从各种注册表源下载 Cosey 包；更新迭代时，升级包即可，不会有代码冲突问题。

## 基于 element-plus

element-plus 是 vue3 生态中最优雅的 UI 组件库之一，兼具企业级设计的严谨与开发者友好的灵活性，接口简单易用。

Cosey 基于 element-plus 并补充了众多组件，意在使开发者更加专注于业务逻辑的开发。

同时对 element-plus 默认主题进行了修改，避免产生审美疲劳，通过简单的配置，你也可以定义自己的主题。

## 质量与规范

通过 `create-cosey` 初始化的项目，预设了 eslint、prettier 工具来确保代码质量。另外，stylelint、commitlint 等工具可视情况来安装。

## 浏览器支持

<table class="home-table table-fixed">
  <thead>
    <tr>
      <th>
        <div class="flex gap-2 items-center">
          IE <img src="/LogosInternetexplorer.svg" width="24" height="24" />
        </div>
      </th>
      <th>
        <div class="flex gap-2 items-center">
          Edge <img src="/LogosMicrosoftEdge.svg" width="24" height="24" />
        </div>
      </th>
      <th>
        <div class="flex gap-2 items-center">
          Chrome <img src="/LogosChrome.svg" width="24" height="24" />
        </div>
      </th>
      <th>
        <div class="flex gap-2 items-center">
          Firefox <img src="/LogosFirefox.svg" width="24" height="24" />
        </div>
      </th>
      <th>
        <div class="flex gap-2 items-center">
          Safari <img src="/LogosSafari.svg" width="24" height="24" />
        </div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>不支持</td>
      <td>≥ 85</td>
      <td>≥ 85</td>
      <td>≥ 79</td>
      <td>≥ 14.1</td>
    </tr>
  </tbody>
</table>
