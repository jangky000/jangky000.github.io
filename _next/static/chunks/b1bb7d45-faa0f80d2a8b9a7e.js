"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[723],{85337:function(e,t,s){s.d(t,{QV:function(){return N}});var i=s(30013),n=s(39840),l=s(28891),r=s(48090),a=s(40588),o=s(49897),h=s(73146),u=s(86275),p=s(38678),c=s(92328),f=s(38374),d=s(2931),g=s(30618),m=s(96040),y=s(51977),w=s(77385),b=s(26325),T=s(41111),v=s(28913),$=s(26347),z=s(86529);function O(e){return Array.isArray(e)}function S(e){return!(e instanceof i.Tensor)&&!O(e)}function k(e,t,s,i=!0,n=""){let l;if(null==t||0===t.length){if(null!=e){let r=!1;if(O(e)&&e.length>0)r=!0;else if(S(e)){for(let o in e)if(e.hasOwnProperty(o)){r=!0;break}}else r=!0;if(r)throw new a.nu(`Error when checking model ${n} expected no data, but got ${e}`)}return[]}if(null==e)return t.map(e=>null);if(S(e))for(let h of(l=[],t)){if(null==e[h])throw new a.nu(`No data provided for "${h}". Need data for each key in: ${t}`);l.push(e[h])}else if(O(e)){if(e.length!==t.length)throw new a.nu(`Error when checking model ${n}: the Array of Tensors that you are passing to your model is not the size the model expected. Expected to see ${t.length} Tensor(s), but instead got the following list of Tensor(s): ${e}`);l=e}else{if(t.length>1)throw new a.nu(`The model ${n} expects ${t.length} Tensor(s), but only received one Tensor. Found: Tensor with shape ${e.shape}`);l=[e]}if(l=(0,$.YV)(l),null!=s)for(let u=0;u<t.length;++u){if(null==s[u])continue;let p=l[u];if(p.shape.length!==s[u].length)throw new a.nu(`Error when checking ${n}: expected ${t[u]} to have ${s[u].length} dimension(s). but got array with shape ${p.shape}`);for(let c=0;c<s[u].length;++c){if(0===c&&!i)continue;let f=p.shape[c],d=s[u][c];if(null!=d&&d>=0&&f!==d)throw new a.nu(`${n} expected a batch of elements where each example has shape [${s[u].slice(1,s[u].length)}] (i.e.,tensor shape [*,${s[u].slice(1,s[u].length)}]) but the ${n} received an input with ${p.shape[0]} examples, each with shape [${p.shape.slice(1,p.shape.length)}] (tensor shape [${p.shape}])`)}}return l}function A(e,t,s,i=!0,n=""){let l;if(Array.isArray(e)){if(e.length!==t.length)throw new a.nu(`Error when checking model ${n}: the Array of Tensors that you are passing to your model is not the size the the model expected. Expected to see ${t.length} Tensor(s), but instead got ${e.length} Tensors(s).`);l=e}else{if(t.length>1)throw new a.nu(`The model expects ${t.length} ${n} Tensors, but only received one Tensor. Found: array with shape ${JSON.stringify(e.shape)}.`);l=[e]}if(null!=s)for(let r=0;r<t.length;++r){if(null==s[r])continue;let o=l[r];if(o.shape.length!==s[r].length)throw new a.nu(`Error when checking ${n}: expected ${t[r]} to have ${s[r].length} dimension(s), but got array with shape ${JSON.stringify(o.shape)}`);for(let h=0;h<s[r].length;++h){if(0===h&&!i)continue;let u=o.shape[h],p=s[r][h];if(null!=p&&p!==u)throw new a.nu(`Error when checking ${n}: expected ${t[r]} to have shape ${JSON.stringify(s[r])} but got array with shape ${JSON.stringify(o.shape)}.`)}}}class N extends b.W{constructor(e){super(e),this.isTraining=!1}summary(e,t,s=console.log){if(!this.built)throw new a.nu("This model has never been called, thus its weights have not been created yet. So no summary can be displayed. Build the model first (e.g., by calling it on some test data).");(0,g.I)(this,e,t,s)}compile(e){if(null==e.loss&&(e.loss=[]),this.loss=e.loss,"string"==typeof e.optimizer)this.optimizer_=c.j(e.optimizer),this.isOptimizerOwned=!0;else{if(!(e.optimizer instanceof i.Optimizer))throw new a.nu("User-defined optimizer must be an instance of tf.Optimizer.");this.optimizer_=e.optimizer,this.isOptimizerOwned=!1}let t=[];if(Array.isArray(e.loss)||"string"==typeof e.loss||"function"==typeof e.loss){if(Array.isArray(e.loss)){if(e.loss.length!==this.outputs.length)throw new a.nu(`When passing an Array as loss, it should have one entry per model output. The model has ${this.outputs.length} output(s), but you passed loss=${e.loss}.`);let s=e.loss;t=s.map(e=>u.U2(e))}else{let n=u.U2(e.loss);this.outputs.forEach(e=>{t.push(n)})}}else{for(let l in e.loss=e.loss,e.loss)if(-1===this.outputNames.indexOf(l))throw new a.nu(`Unknown entry in loss dictionary: "${l}". Only expected the following keys: ${this.outputNames}`);for(let o of this.outputNames)null==e.loss[o]&&console.warn(`Output "${o}" is missing from loss dictionary. We assume this was done on purpose, and we will not be expecting data to be passed to ${o} during training`),t.push(u.U2(e.loss[o]))}this.lossFunctions=t,this.feedOutputNames=[],this.feedOutputShapes=[],this.feedLossFns=[];for(let h=0;h<this.outputs.length;++h){let f=this.internalOutputShapes[h],d=this.outputNames[h];this.feedOutputNames.push(d),this.feedOutputShapes.push(f),this.feedLossFns.push(this.lossFunctions[h])}let g=[];this.metrics=e.metrics,this.metricsNames=["loss"],this.metricsTensors=[],(0,r.f4)("loss",()=>{for(let e=0;e<this.outputs.length;++e){if(-1!==g.indexOf(e))continue;let t=this.lossFunctions[e];this.outputs.length>1&&(this.metricsTensors.push([t,e]),this.metricsNames.push(this.outputNames[e]+"_loss"))}});let m=function(e,t){let s;if(null==e||Array.isArray(e)&&0===e.length)return t.map(e=>[]);if("string"==typeof e||"function"==typeof e)s=[e];else if(Array.isArray(e)||"object"==typeof e)s=e;else throw TypeError(`Type of metrics argument not understood. Expected an string,function, Array, or Object, found: ${e}`);if(Array.isArray(s))return t.map(e=>s);{let i=[];for(let n of t){let l=s.hasOwnProperty(n)?s[n]:[];Array.isArray(l)||(l=[l]),i.push(l)}return i}}(e.metrics,this.outputNames),y=(e,t,s)=>{this.outputNames.length>1&&(t=this.outputNames[e]+"_"+t),this.metricsNames.push(t),this.metricsTensors.push([s,e])};(0,r.f4)("metric",()=>{for(let e=0;e<this.outputs.length;++e){if(-1!==g.indexOf(e))continue;let t=m[e],s=t=>{let s,i,n;for(let l of t){let a;if("string"==typeof l&&-1!==["accuracy","acc","crossentropy","ce"].indexOf(l)){let o;let h=this.internalOutputShapes[e];1===h[h.length-1]||this.lossFunctions[e]===u.fO?-1!==["accuracy","acc"].indexOf(l)?i=p._F:-1!==["crossentropy","ce"].indexOf(l)&&(i=p.fO):this.lossFunctions[e]===u.KM?-1!==["accuracy","acc"].indexOf(l)?i=p.TY:-1!==["crossentropy","ce"].indexOf(l)&&(i=p.KM):-1!==["accuracy","acc"].indexOf(l)?i=p.G5:-1!==["crossentropy","ce"].indexOf(l)&&(i=p.uq),-1!==["accuracy","acc"].indexOf(l)?o="acc":-1!==["crossentropy","ce"].indexOf(l)&&(o="ce"),n=i,s=""+o}else{let c=p.U2(l);n=c,s=""+p.aI(l)}(0,r.f4)(s,()=>{a=n}),y(e,s,a)}};s(t)}}),this.collectedTrainableWeights=this.trainableWeights}checkTrainableWeightsConsistency(){null!=this.collectedTrainableWeights&&this.trainableWeights.length!==this.collectedTrainableWeights.length&&console.warn("Discrepancy between trainableweights and collected trainable weights. Did you set `model.trainable` without calling `model.compile()` afterwards?")}evaluate(e,t,s={}){let i=null==s.batchSize?32:s.batchSize;(0,$.fQ)(i);let n=this.standardizeUserDataXY(e,t,!0,i);try{let l=n[0].concat(n[1]);this.makeTestFunction();let r=this.testFunction,a=this.testLoop(r,l,i,s.verbose,s.steps);return(0,d.Bq)(a)}finally{(0,$.kS)(n[0],e),(0,$.kS)(n[1],t)}}async evaluateDataset(e,t){return this.makeTestFunction(),(0,v.D)(this,e,t)}checkNumSamples(e,t,s,i="steps"){let n;if(null!=s){if(n=null,null!=t)throw new a.nu(`If ${i} is set, batchSize must be null or undefined.Got batchSize = ${t}`)}else if(null!=e)n=Array.isArray(e)?e[0].shape[0]:e.shape[0];else throw new a.nu(`Either the input data should have a defined shape, or ${i} shoud be specified.`);return n}execute(e,t){if(Array.isArray(t)&&0===t.length)throw new a.nu("`outputs` is an empty Array, which is not allowed.");let s=Array.isArray(t),n=this.retrieveSymbolicTensors(s?t:[t]),l=new T.l2;if(e instanceof i.Tensor&&(e=[e]),Array.isArray(e)){if(e.length!==this.inputs.length)throw new a.nu(`The number of inputs provided (${e.length}) does not match the number of inputs of this model (${this.inputs.length}).`);for(let r=0;r<this.inputs.length;++r)l.add(this.inputs[r],e[r])}else for(let o of this.inputs){let h=e[o.name];if(null==h)throw new a.nu(`No value is provided for the model's input ${o.name}`);l.add(o,h)}let u=(0,T.ht)(n,l);return s?u:u[0]}retrieveSymbolicTensors(e){let t=(0,d.JE)(null,e.length),s=e.length;for(let i of this.layers){let n=Array.isArray(i.output)?i.output:[i.output],l=n.map(e=>e.name);for(let r=0;r<e.length;++r){let o=l.indexOf(e[r]);if(-1!==o&&(t[r]=n[o],s--),0===s)break}if(0===s)break}if(s>0){let h=[];throw t.forEach((t,s)=>{null==t&&h.push(e[s])}),new a.nu(`Cannot find SymbolicTensors for output name(s): ${JSON.stringify(h)}`)}return t}predictLoop(e,t=32,s=!1){return i.tidy(()=>{let n=this.checkNumSamples(e);if(s)throw new a.nj("Verbose predictLoop() is not implemented yet.");let l=(0,$.R_)(n,t),r=this.outputs.map(e=>[]);for(let o=0;o<l.length;++o){let h=i.tidy(()=>{let t=l[o][0],s=l[o][1],i=(0,$.sf)(e,t,s),n=[];if(Array.isArray(i))for(let r=0;r<i.length;++r)n.push({key:this.inputs[r],value:i[r]});else n.push({key:this.inputs[0],value:i});let a=new T.l2(n);return(0,T.ht)(this.outputs,a)});h.forEach((e,t)=>r[t].push(e))}return(0,d.Bq)(r.map(e=>i.concat(e,0)))})}predict(e,t={}){let s=(0,$.YV)(e);A(s,this.inputNames,this.feedInputShapes,!1);try{let i=null==t.batchSize?32:t.batchSize;return(0,$.fQ)(i),this.predictLoop(s,i)}finally{(0,$.kS)(s,e)}}predictOnBatch(e){A(e,this.inputNames,this.feedInputShapes,!0);let t=(Array.isArray(e)?e[0]:e).shape[0];return this.predictLoop(e,t)}standardizeUserDataXY(e,t,s=!0,n){if(null==this.optimizer_)throw new a.LH("You must compile a model before training/testing. Use LayersModel.compile(modelCompileArgs).");let l=[];for(let r=0;r<this.feedOutputShapes.length;++r){let o=this.feedOutputShapes[r],h=this.feedLossFns[r];h===u.KM?l.push(o.slice(0,o.length-1).concat([1])):l.push(o)}if(!function(e,t,s){let n=(0,d.Tw)(e.map(e=>e.shape[0]));n.sort();let l=(0,d.Tw)(t.map(e=>e.shape[0]));if(l.sort(),n.length>1)throw new a.nu(`All input Tensors (x) should have the same number of samples. Got array shapes: ${JSON.stringify(e.map(e=>e.shape))}`);if(l.length>1)throw new a.nu(`All target Tensors (y) should have the same number of samples. Got array shapes: ${JSON.stringify(t.map(e=>e.shape))}`);if(n.length>0&&l.length>0&&!i.util.arraysEqual(n,l))throw new a.nu(`Input Tensors should have the same number of samples as target Tensors. Found ${n[0]} input sample(s) and ${l[0]} target sample(s).`)}(e=k(e,this.feedInputNames,this.feedInputShapes,!1,"input"),t=k(t,this.feedOutputNames,l,!1,"target"),0),!function(e,t,s){let i=[u.FD,u.fO,u.uq];for(let n=0;n<e.length;++n){let l=e[n],r=t[n],o=s[n];if(null!=r){if(r===u.uq&&1===l.shape[l.shape.length-1])throw new a.nu(`You are passing a target array of shape ${l.shape} while using a loss 'categorical_crossentropy'. 'categorical_crossentropy'expects targets to be binary matrices (1s and 0s) of shape [samples, classes].`);if(-1!==i.indexOf(r)){let h=l.shape.slice(1),p=o.slice(1);for(let c=0;c<h.length;++c){let f=h[c],d=p[c];if(null!=d&&f!==d)throw new a.nu(`A target Tensor with shape ${l.shape} was passed for an output of shape ${o}, while using a loss function that expects targets to have the same shape as the output.`)}}}}}(t,this.feedLossFns,this.feedOutputShapes),this.stateful&&null!=n&&n>0&&e[0].shape[0]%n!=0)throw new a.nu(`In a stateful network, you should only pass inputs with a number of samples that is divisible by the batch size ${n}. Found: ${e[0].shape[0]} sample(s).`);return[e,t]}async standardizeUserData(e,t,s,i,n=!0,l){let[r,a]=this.standardizeUserDataXY(e,t,n,l);if(null!=s)throw Error("sample weight is not supported yet.");let o=null;if(null!=i){let h=(0,z.Vf)(i,this.outputNames);o=[];for(let u=0;u<h.length;++u)o.push(await (0,z.tl)(a[u],null,h[u]))}return[r,a,o]}testLoop(e,t,s,l=0,r){return i.tidy(()=>{let o=this.checkNumSamples(t,s,r,"steps"),h=[];if(l>0)throw new a.nj("Verbose mode is not implemented yet.");if(null!=r)throw new a.nj("steps mode in testLoop() is not implemented yet");{let u=(0,$.R_)(o,s),p=(0,i.tensor1d)((0,m.w6)(0,o));for(let c=0;c<u.length;++c){let f=u[c][0],d=u[c][1],g=n.c9(p,f,d-f),y=(0,$.YX)(t,g),w=e(y);if(0===c)for(let b=0;b<w.length;++b)h.push((0,i.scalar)(0));for(let T=0;T<w.length;++T){let v=w[T];h[T]=i.add(h[T],i.mul(d-f,v))}}for(let z=0;z<h.length;++z)h[z]=i.div(h[z],o)}return h})}getDedupedMetricsNames(){let e=this.metricsNames,t=[];for(let s=0;s<e.length;++s){let i=e[s],n=i;if((0,d.QX)(e,i)>1){let l=(0,d.QX)(e.slice(0,s),i);n+=`_${l}`}t.push(n)}return t}makeTrainFunction(){return e=>{let t=[],s=e.slice(0,this.inputs.length),n=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),l=e.slice(this.inputs.length+this.outputs.length,this.inputs.length+2*this.outputs.length),r=[],a=()=>{let e;let a=[];for(let o=0;o<this.inputs.length;++o)a.push({key:this.inputs[o],value:s[o]});let h=new T.l2(a),u=(0,T.ht)(this.outputs,h,{training:!0});for(let p=0;p<this.lossFunctions.length;++p){let c=this.lossFunctions[p],f=c(n[p],u[p]);null!=l[p]&&(f=(0,z.mo)(f,l[p]));let d=i.mean(f);t.push(d),e=0===p?f:i.add(e,f)}for(let g=0;g<this.metricsTensors.length;++g){let m;if(this.outputs.length>1&&g<this.outputs.length)m=t[g];else{let y=this.metricsTensors[g][0],w=this.metricsTensors[g][1];m=i.mean(y(n[w],u[w]))}i.keep(m),r.push(m)}return e=i.mean(e),this.calculateLosses().forEach(t=>{e=i.add(e,t)}),e},o=this.collectedTrainableWeights.map(e=>e.read()),h=this.optimizer_.minimize(a,!0,o);return[h].concat(r)}}makeTestFunction(){this.testFunction=e=>i.tidy(()=>{let t;let s=[],n=e.slice(0,this.inputs.length),l=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),r=[];for(let a=0;a<this.inputs.length;++a)r.push({key:this.inputs[a],value:n[a]});let o=new T.l2(r),h=(0,T.ht)(this.outputs,o);for(let u=0;u<this.lossFunctions.length;++u){let p=this.lossFunctions[u],c=i.mean(p(l[u],h[u]));t=0===u?c:i.add(t,c),s.push(t)}for(let f=0;f<this.metricsTensors.length;++f){let d=this.metricsTensors[f][0],g=this.metricsTensors[f][1],m=i.mean(d(l[g],h[g]));s.push(m)}return s})}async fit(e,t,s={}){let n,r,o,h,u,p,c,f,d;if(this.isTraining)throw Error("Cannot start training because another fit() call is ongoing.");this.isTraining=!0;try{let g,m,y;let w=null==s.batchSize?32:s.batchSize;(0,$.fQ)(w);let b=await this.standardizeUserData(e,t,s.sampleWeight,s.classWeight,!1,w);n=b[0],r=b[1],d=b[2];let T=!1;if(null!=s.validationData&&s.validationData.length>0){if(T=!0,2===s.validationData.length)u=s.validationData[0],p=s.validationData[1];else if(3===s.validationData.length)throw new a.nj("validationData including sample weights is not supported yet.");else throw new a.nu(`When passing validation data, it must contain 2 (valX, valY) or 3 (valX, valY, valSampleWeight) items; ${s.validationData} is invalid.`);let v=await this.standardizeUserData(u,p,null,null,!0,w);c=v[0],f=v[1],g=c.concat(f)}else if(null!=s.validationSplit&&s.validationSplit>0&&s.validationSplit<1){T=!0;let z=Math.floor(n[0].shape[0]*(1-s.validationSplit)),O=n[0].shape[0];c=(0,$.sf)(n,z,O),o=n,n=(0,$.sf)(n,0,z),f=(0,$.sf)(r,z,O),h=r,r=(0,$.sf)(r,0,z),g=c.concat(f)}else null!=s.validationSteps&&(T=!0);let S=n.concat(r).concat(d);this.checkTrainableWeightsConsistency();let k=this.makeTrainFunction(),A=this.getDedupedMetricsNames();T?(this.makeTestFunction(),m=this.testFunction,y=A.slice().concat(A.map(e=>"val_"+e))):(m=null,g=[],y=A.slice());let N=(0,l.CZ)(s.callbacks,s.yieldEvery),D=await this.fitLoop(k,S,A,w,s.epochs,s.verbose,N,m,g,s.shuffle,y,s.initialEpoch,null,null);return D}finally{this.isTraining=!1,(0,$.kS)(n,e),(0,$.kS)(r,t),(0,$.kS)(o,e),(0,$.kS)(h,t),(0,$.kS)(c,u),(0,$.kS)(f,p),null!=d&&i.dispose(d)}}async fitLoop(e,t,s,r,o,u,p,c,f,d,g,y,w,b){let T;null==r&&(r=32),null==o&&(o=1),null==d&&(d=!0),null==y&&(y=0);let v=!1;if(null!=c&&null!=f&&(v=!0),null!=b&&(v=!0,null==w))throw new a.nu("Can only use `validationSteps` when doing step-wise training, i.e., `stepsPerEpoch` must be set.");let z=this.checkNumSamples(t,r,w,"steps_per_epoch");null!=z&&(T=(0,m.w6)(0,z)),null==u&&(u=1);let{callbackList:O,history:S}=(0,l.m$)(p,u,o,y,z,w,r,v,g);O.setModel(this),this.history=S,await O.onTrainBegin(),this.stopTraining_=!1;for(let k=y;k<o;++k){await O.onEpochBegin(k);let A={};if(null!=w)throw new a.nj("stepsPerEpoch mode is not implemented yet.");{if("batch"===d)throw new a.nj("batch shuffling is not implemneted yet");d&&i.util.shuffle(T);let N=(0,i.tensor1d)(T),D=(0,$.R_)(z,r);for(let _=0;_<D.length;++_){let E={};if(await O.onBatchBegin(_,E),i.tidy(()=>{let l=D[_][0],a=D[_][1],o=n.c9(N,l,a-l);E.batch=_,E.size=a-l;let h=(0,$.YX)(t,o),u=e(h);for(let p=0;p<s.length;++p){let d=s[p],g=u[p];E[d]=g,i.keep(g)}if(_===D.length-1&&v){let m=this.testLoop(c,f,r);for(let y=0;y<s.length;++y){let w=s[y],b=m[y];i.keep(b),A["val_"+w]=b}}}),await O.onBatchEnd(_,E),(0,h.i)(E),this.stopTraining_)break}N.dispose()}if(await O.onEpochEnd(k,A),this.stopTraining_)break}return await O.onTrainEnd(),await this.history.syncData(),this.history}async fitDataset(e,t){return(0,v.y)(this,e,t)}async trainOnBatch(e,t){let s=await this.standardizeUserData(e,t),n=s[0],l=s[1],r=this.makeTrainFunction(),a=r(n.concat(l)),o=[];for(let h of a){let u=await h.data();o.push(u[0])}return i.dispose(a),(0,$.kS)(s[0],e),(0,$.kS)(s[1],t),(0,d.Bq)(o)}getNamedWeights(e){let t=[],s=null!=e&&e.trainableOnly,i=s?this.trainableWeights:this.weights,n=this.getWeights(s);for(let l=0;l<i.length;++l)(!s||i[l].trainable)&&t.push({name:i[l].originalName,tensor:n[l]});return t}set stopTraining(e){this.stopTraining_=e}get stopTraining(){return this.stopTraining_}get optimizer(){return this.optimizer_}set optimizer(e){this.optimizer_!==e&&(this.optimizer_=e,this.isOptimizerOwned=!1)}dispose(){let e=super.dispose();if(0===e.refCountAfterDispose&&null!=this.optimizer&&this.isOptimizerOwned){let t=i.memory().numTensors;this.optimizer_.dispose(),e.numDisposedVariables+=t-i.memory().numTensors}return e}getLossIdentifiers(){let e;if("string"==typeof this.loss)e=(0,d.D1)(this.loss);else if(Array.isArray(this.loss)){for(let t of this.loss)if("string"!=typeof t)throw Error("Serialization of non-string loss is not supported.");e=this.loss.map(e=>(0,d.D1)(e))}else{let s=Object.keys(this.loss);e={};let i=this.loss;for(let n of s)if("string"==typeof i[n])e[n]=(0,d.D1)(i[n]);else throw Error("Serialization of non-string loss is not supported.")}return e}getMetricIdentifiers(){if("string"==typeof this.metrics||"function"==typeof this.metrics)return[(0,d.D1)(p.aI(this.metrics))];if(Array.isArray(this.metrics))return this.metrics.map(e=>(0,d.D1)(p.aI(e)));{let e={};for(let t in this.metrics)e[t]=(0,d.D1)(p.aI(this.metrics[t]));return e}}getTrainingConfig(){return{loss:this.getLossIdentifiers(),metrics:this.getMetricIdentifiers(),optimizer_config:{class_name:this.optimizer.getClassName(),config:this.optimizer.getConfig()}}}loadTrainingConfig(e){let t,s;if(null!=e.weighted_metrics)throw Error("Loading weight_metrics is not supported yet.");if(null!=e.loss_weights)throw Error("Loading loss_weights is not supported yet.");if(null!=e.sample_weight_mode)throw Error("Loading sample_weight_mode is not supported yet.");let i=(0,y.a)(e.optimizer_config),n=(0,o.v)(i);if("string"==typeof e.loss)t=(0,d.zW)(e.loss);else if(Array.isArray(e.loss))t=e.loss.map(e=>(0,d.zW)(e));else if(null!=e.loss)for(let l in t={},e.loss)t[l]=(0,d.zW)(e.loss[l]);if(Array.isArray(e.metrics))s=e.metrics.map(e=>(0,d.zW)(e));else if(null!=e.metrics)for(let r in s={},e.metrics)s[r]=(0,d.zW)(e.metrics[r]);this.compile({loss:t,metrics:s,optimizer:n})}async save(e,t){if("string"==typeof e){let s=i.io.getSaveHandlers(e);if(0===s.length)throw new a.nu(`Cannot find any save handlers for URL '${e}'`);if(s.length>1)throw new a.nu(`Found more than one (${s.length}) save handlers for URL '${e}'`);e=s[0]}if(null==e.save)throw new a.nu("LayersModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");let n=await i.io.encodeWeights(this.getNamedWeights(t)),l=this.toJSON(null,!1),r={modelTopology:l,format:"layers-model",generatedBy:`TensorFlow.js tfjs-layers v${w.i}`,convertedBy:null},o=null!=t&&t.includeOptimizer;if(o&&null!=this.optimizer){r.trainingConfig=this.getTrainingConfig();let{data:h,specs:u}=await i.io.encodeWeights(await this.optimizer.getWeights(),"optimizer");n.specs.push(...u),n.data=i.io.concatenateArrayBuffers([n.data,h])}return null!=this.userDefinedMetadata&&((0,f.WE)(this.userDefinedMetadata,this.name,!0),r.userDefinedMetadata=this.userDefinedMetadata),r.weightData=n.data,r.weightSpecs=n.specs,e.save(r)}setUserDefinedMetadata(e){(0,f.WE)(e,this.name),this.userDefinedMetadata=e}getUserDefinedMetadata(){return this.userDefinedMetadata}}N.className="Model",i.serialization.registerClass(N);class D extends N{}D.className="Functional",i.serialization.registerClass(D)}}]);
//# sourceMappingURL=b1bb7d45-faa0f80d2a8b9a7e.js.map