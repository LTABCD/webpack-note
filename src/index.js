let a=require('./a.js');
document.getElementById('app').innerHTML=a;
import './index.css';
import './a.less';
if(module.hot){//热更新
	module.hot.accept();
//	module.hot.accept('./a.js',function(){
//		let a=require('./a.js');
//		document.getElementById('app').innerHTML=a;
//	})
}
