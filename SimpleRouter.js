function Router (path) {
	let Router;
    let reg1 = /(\/:\w+)/g;
	let reg2 = /(\/\w+)/g;
	switch (path.match(reg2).length) {
 	case 1:
    	Router = function () {
            return {
                pattern: '/:id',
                params: {
                    id: path.match(reg2)[0].substring(1)
                }
            }
        }
    break;
    case 2:
     	Router = function () {
            return {
                pattern: '/:group/:name',
                params : {
                    group: path.match(reg2)[0].substring(1),
                    name: path.match(reg2)[1].substring(1)
                }
            }
     	}
    break;
    default:
    	Router = function () {
            return {
                pattern:'error',
                params : null
            }
    	}
    break;
  }
  return Router;
} 

export default Router;
