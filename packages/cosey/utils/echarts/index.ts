/**
 * 按需导入 echarts 相关部件，减少打包体积。
 */

import * as echarts from 'echarts/core';

import { CanvasRenderer } from 'echarts/renderers';

import {
  LineChart, // 折线图
  BarChart, // 柱状图
  PieChart, // 饼图
  ScatterChart, // 散点图
  RadarChart, // 雷达图

  // # spare
  MapChart, // 地理坐标/地图
  TreeChart, // 树图
  TreemapChart, // 矩形树图
  GraphChart, // 关系图
  GaugeChart, // 仪表盘
  FunnelChart, // 漏斗图
  ParallelChart, // 平行坐标系
  SankeyChart, // 桑基图
  BoxplotChart, // 盒须图
  CandlestickChart, // K 线图
  EffectScatterChart, // 涟漪特效散点图
  LinesChart, // 路径图
  HeatmapChart, // 热力图
  PictorialBarChart, // 象形柱图
  ThemeRiverChart, // 主题河流图
  SunburstChart, // 旭日图
  CustomChart, // 自定义系列
} from 'echarts/charts';

import {
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  MarkLineComponent,

  // # spare
  PolarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  AxisPointerComponent,
  BrushComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkAreaComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
} from 'echarts/components';

import { UniversalTransition, LabelLayout } from 'echarts/features';

echarts.use([CanvasRenderer]);

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,

  // # spare
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart,
]);

echarts.use([
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  MarkLineComponent,

  // # spare
  PolarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  AxisPointerComponent,
  BrushComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkAreaComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
]);

echarts.use([UniversalTransition, LabelLayout]);

import type {
  ComposeOption,
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
  RadarSeriesOption,
  GridComponentOption,
  TitleComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
  ToolboxComponentOption,
  DatasetComponentOption,
  RadarComponentOption,
} from 'echarts';

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | RadarSeriesOption
  | GridComponentOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
  | RadarComponentOption
>;

import macarons from './theme/macarons';
echarts.registerTheme('macarons', macarons);

export { echarts };
