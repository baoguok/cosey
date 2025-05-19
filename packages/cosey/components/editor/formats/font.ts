import { Parchment } from 'quill';

class FontStyleAttributor extends Parchment.StyleAttributor {
  value(node: HTMLElement) {
    return super.value(node).replace(/[']/g, '"');
  }
}

export const fonts = [
  // 中文
  ['Microsoft YaHei', '"Microsoft YaHei"'],
  ['PingFang SC', '"PingFang SC"'],
  ['Hiragino Sans GB', '"Hiragino Sans GB"'],
  ['SimSun', 'SimSun'],
  ['STHeiti', 'STHeiti'],

  // 英文
  ['Andale Mono', '"andale mono", monospace'],
  ['Arial', 'arial, helvetica, sans-serif'],
  ['Arial Black', '"arial black", sans-serif'],
  ['Book Antiqua', '"book antiqua", palatino, serif'],
  ['Comic Sans MS', '"comic sans ms", sans-serif'],
  ['Courier New', '"courier new", courier, monospace'],
  ['Georgia', 'georgia, palatino, serif'],
  ['Helvetica', 'helvetica, arial, sans-serif'],
  ['Impact', 'impact, sans-serif'],
  ['Symbol', 'symbol'],
  ['Tahoma', 'tahoma, arial, helvetica, sans-serif'],
  ['Terminal', 'terminal, monaco, monospace'],
  ['Times New Roman', '"times new roman", times, serif'],
  ['Trebuchet MS', '"trebuchet ms", geneva, sans-serif'],
  ['Verdana', 'verdana, geneva, sans-serif'],
];

export const FontStyle = new FontStyleAttributor('font', 'font-family', {
  scope: Parchment.Scope.INLINE,
});
