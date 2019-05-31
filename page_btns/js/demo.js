;(function(){
      var oPageList = $get('.J_page-list')[0],

            curPage = 1,
            pages = 5;

      function init() {
            bindEvent();
            oPageList.innerHTML = renderPageList(curPage, pages);
      }

      function bindEvent() {
            addEvent(oPageList, 'click', pageListClick);
      }

      function pageListClick(e) {
            var e = e || window.event,
                  tar = e.target || e.srcElement,
                  className = tar.className;

            if(className) {
                  switch(className) {
                        case 'page-btn':
                              curPage = parseInt(tar.getAttribute('data-page'));
                              oPageList.innerHTML = renderPageList(curPage, pages);
                              break;
                        case 'backward-btn':
                              curPage--;
                              oPageList.innerHTML = renderPageList(curPage, pages);
                              break;
                        case 'forward-btn':
                              curPage++;
                              oPageList.innerHTML = renderPageList(curPage, pages);
                              break;
                        default:
                              break;
                  }
            }
      }

      init();
} ())