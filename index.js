import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';

const BODY_TAG_PATTERN = /\<\/ *body\>/;

// Do not add any comments to this! It will break because all line breaks will removed for
// some weird reason when this script is injected.
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

/* @flow */

export default class AutoHeightWebView extends Component {
  render() {
    const {style,webStyle,webUrl} = this.props
    return (
      <View style={[styles.container,{style}]}>
        <WebView
          <WebView
           scrollEnabled = {false}
           style={[styles.webView,webStyle]}
           source={{uri:codeInject(webUrl)}}
         />
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
