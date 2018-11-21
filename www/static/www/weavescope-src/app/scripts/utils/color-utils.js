import { hsl } from 'd3-color';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';

const PSEUDO_COLOR = '#b1b1cb';
const hueRange = [20, 330]; // exclude red
const hueScale = scaleLinear().range(hueRange);
const networkColorScale = scaleOrdinal(schemeCategory10);
// map hues to lightness
const lightnessScale = scaleLinear().domain(hueRange).range([0.5, 0.7]);
const startLetterRange = 'A'.charCodeAt();
const endLetterRange = 'Z'.charCodeAt();
const letterRange = endLetterRange - startLetterRange;

/**
 * Converts a text to a 360 degree value
 */
export function text2degree(text) {
  const input = text.substr(0, 2).toUpperCase();
  let num = 0;
  for (let i = 0; i < input.length; i += 1) {
    const charCode = Math.max(Math.min(input[i].charCodeAt(), endLetterRange), startLetterRange);
    num += Math.pow(letterRange, input.length - i - 1) * (charCode - startLetterRange);
  }
  hueScale.domain([0, Math.pow(letterRange, input.length)]);
  return hueScale(num);
}

export function colors(text, secondText) {
  let hue = text2degree(text);
  // skip green and shift to the end of the color wheel
  if (hue > 70 && hue < 150) {
    hue += 80;
  }
  const saturation = 0.6;
  let lightness = 0.5;
  if (secondText) {
    // reuse text2degree and feed degree to lightness scale
    lightness = lightnessScale(text2degree(secondText));
  }
  return hsl(hue, saturation, lightness);
}

export function getNeutralColor() {
  return PSEUDO_COLOR;
}

export function getNodeColor(text = '', secondText = '', isPseudo = false) {
  if (isPseudo) {
    return PSEUDO_COLOR;
  }
  return colors(text, secondText).toString();
}

export function getNodeColorDark(text = '', secondText = '', isPseudo = false) {
  if (isPseudo) {
    return PSEUDO_COLOR;
  }
  let color = hsl(colors(text, secondText));

  // ensure darkness
  if (color.h > 20 && color.h < 120) {
    color = color.darker(2);
  } else if (hsl.l > 0.7) {
    color = color.darker(1.5);
  } else {
    color = color.darker(1);
  }

  return color.toString();
}

export function getNetworkColor(text) {
  return networkColorScale(text);
}

export function brightenColor(c) {
  let color = hsl(c);
  if (hsl.l > 0.5) {
    color = color.brighter(0.5);
  } else {
    color = color.brighter(0.8);
  }
  return color.toString();
}



const statusColorMap = {
    'running' : 'rgb(0,215,119)',//运行
    'closed'  : 'rgb(0,0,0)',//关闭
    'undeploy' : 'rgb(32, 18, 77)',//取消
    'starting' : 'rgb(246,157,53)',//开始
    'checking' : 'rgb(255,153,0)',//检查
    'stoping' : 'rgb(246,154,16)',//回采
    'upgrade' : 'rgb(0,255,0)',//升级中
    'unusual' : 'rgb(234,88,62)',//异常
    'Owed' : ' rgb(234,88,62)',//欠
    'expired' : 'rgb(255,0,0)',//过期
    'Expired' : 'rgb(255,0,0)',
    'internet' : 'rgb(91,178,250)',
    'The Internet' : 'rgb(91,178,250)',
    'Unknow' : 'rgb(217,16,16)',
    'unknow' : 'rgb(217,16,16)',//不知何时
    'stopping': 'rgb(67,67,67)',//停止,
    'abnormal':'rgb(255,0,255)',//不正常,
    'some_abnormal':'rgb(255,0,255)',//一些不正常
    'building':'rgb(0,119,255)',//构建
    'build_failure':'rgb(204,204,204)'//构建失败
}

export function getStatusColor(status) {
  return statusColorMap[status] || statusColorMap['unknow'];
}
