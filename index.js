import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';

const BODY_TAG_PATTERN = /\<\/ *body\>/;

var script = `
;(function() {
var wrapper = document.createElement("div");
wrapper.id = "height-wrapper";
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(wrapper);
var i = 0;
function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
}
updateHeight();
window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
});
window.addEventListener("resize", updateHeight);
}());
`;


const style = `
<style>
body, html, #height-wrapper {
    margin: 0;
    padding: 0;
}
#height-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
<script>
${script}
</script>
`;

const codeInject = (html) => html.replace(BODY_TAG_PATTERN, style + "</body>");

export default class AutoHeightWebView extends Component {

  render() {
    const {style,webStyle,webUrl} = this.props
    return (
      <View style={[styles.container,style]}>
          <WebView
           ref={webview => thisWebView = webview}
           style={[styles.webView,webStyle]}
           scrollEnabled = {false}
           source={{html:'<p style="margin-top: 20px; margin-bottom: 20px; padding: 0px; font-size: 14px; color: rgb(68, 68, 68); font-family: &quot;Microsoft YaHei&quot;, Tahoma, Arial, 宋体; line-height: 24px; white-space: normal; widows: 1; background-color: rgb(255, 255, 255);">（1）在房间里放上几盒开盖的风油精、清凉油，或在墙上涂点薄荷；在身上或枕头上洒些香水；将樟脑丸磨碎、撒在屋内墙角；在室内的花盆里栽一两株西红柿，西红柿枝叶发出的气味会把蚊子赶走。</p><p style="margin-top: 20px; margin-bottom: 20px; padding: 0px; font-size: 14px; color: rgb(68, 68, 68); font-family: &quot;Microsoft YaHei&quot;, Tahoma, Arial, 宋体; line-height: 24px; white-space: normal; widows: 1; background-color: rgb(255, 255, 255);">（2）在灯下挂一把香葱，或用纱袋装几根葱段，各种小虫都不会飞来；用橘红色玻璃纸或绸布套在灯泡上，蚊子最怕橘红色光。</p><p><br/></p>'}}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%'
  },
  webView:{
    height:'100%'
  }
});
// export default class App extends Component {
//   componentWillReceiveProps(nextProps) {
//     if(nextProps.option !== this.props.option) {
//       this.refs.chart.reload();
//     }
//   }
//
//   render() {
//     // var source;
//     // const _source = resolveAssetSource(require('./tpl.html'));
//     // if (__DEV__) {
//     //   source = { uri: `${_source.uri}`};
//     //   //  source={require('./tpl.html')}
//     // } else {
//     //   const sourceAndroid = { uri: `file:///android_asset/tpl.html` };
//     //   const sourceIOS = { uri: `file://${_source.uri}` };
//     //   source = Platform.OS === 'ios' ? sourceIOS : sourceAndroid;
//     // }
//
//     return (
//       <View style={[styles.]}>
//         <WebView
//           ref="chart"
//           scrollEnabled = {false}
//           injectedJavaScript = {renderChart(this.props)}
//           style={{
//             height:'100%',
//           }}
//           // source={source}
//           // source={require('./tpl.html')}
//           source={__DEV__?require('./tpl.html'):{uri:codeInject('file:///android_asset/tpl.html')}}
//           // source={codeInject(require('./tpl.html'))}
//           // source={}
//         />
//       </View>
//     );
//   }
// }
