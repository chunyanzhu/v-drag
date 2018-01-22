import Vue from 'vue';

Vue.directive('drag', {
  bind:function (el, binding) {
    let oDiv = el,   //当前元素
      self = this,  //上下文
      _mX = binding.value.mX,
      _mY = binding.value.mY,
      disable = binding.value.disable;
    var canvas = $(oDiv).find('canvas')[0];
    var canMove = false;
    var dis = {
      disX: 0, 
      disY: 0
    };
    oDiv.addEventListener('mousedown', function (e) {
      if($(this).hasClass('editing') && e.target.tagName.toUpperCase() === 'CANVAS'){
        e.preventDefault();
      }
      e.stopPropagation();
      if(e.target.tagName.toUpperCase() === 'INPUT'){
        canMove = false;
      }
      else{
        canMove = true;
      }
      var oDivW = el.offsetWidth;
      var oDivH = el.offsetHeight;
      
      //鼠标按下，计算当前元素距离可视区的距离
      dis.disX = e.clientX - oDiv.offsetLeft;
      dis.disY = e.clientY - oDiv.offsetTop;

    });
    document.addEventListener('mousemove', function (e) {
      if(!canMove){
        return;
      }
        e.stopPropagation();
        if(e.target.tagName.toUpperCase() == 'INPUT'){
          return;
        }

        if(disable){
          return;
        }
        //通过事件委托，计算移动的距离
        let l = e.clientX - dis.disX;
        let t = e.clientY - dis.disY;
        canvas.style.width = canvas.getAttribute('width') + 'px';
        canvas.style.height = canvas.getAttribute('height') + 'px';
        //超出范围也可以移动
        //移动当前元素
        oDiv.style.left = l + 'px';
        oDiv.style.top = t + 'px';
        
        //将此时的位置传出去
        binding.value.fn({x: l, y: t});
    });
    document.addEventListener('mouseup', function (e) {
      canMove = false;
      dis.disX = 0;
      dis.disY = 0;
      e.stopPropagation();
      document.onmousemove = null;
      document.onmouseup = null;
    });
  }
});
