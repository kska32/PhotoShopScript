function flexibleGrid(){
	if(app.documents.length > 0){
		var respond = prompt("ColumnWidth and GutterWidth(in pixel):","60,20,true");
		if(respond){
			respond = respond.split(",");
			var doc = app.activeDocument; 
			var colWidth = parseInt(respond[0]);
			var gutterWidth = parseInt(respond[1]);

			var docWidth = doc.width;

			var ns = get_numCols_startX(docWidth,colWidth,gutterWidth);
			var numCols = ns.numCols;
			var startValue = ns.startX;
			
			var realWidth = ( colWidth + gutterWidth ) * numCols - gutterWidth;
			var docHeight = doc.height;
			
			doc.guides.add(Direction.VERTICAL, 0);
			doc.guides.add(Direction.VERTICAL, docWidth);
			doc.guides.add(Direction.VERTICAL, docWidth / 2);
			doc.guides.add(Direction.HORIZONTAL, 0);
			doc.guides.add(Direction.HORIZONTAL, docHeight);

			for(i = 0; i < numCols; i++ ) {
				doc.guides.add(Direction.VERTICAL, startValue + colWidth * i );
				doc.guides.add(Direction.VERTICAL, startValue + colWidth * i + gutterWidth/2);
				doc.guides.add(Direction.VERTICAL, startValue + colWidth * i + gutterWidth);
				startValue += gutterWidth;
			}  
			if (respond[2] === "true") extra(ns.startX,gutterWidth);
		}else if(respond === null){
			return 0;
		}else{
			alert("Please enter something...");
			flexibleGrid();
		}
	} 

	function get_numCols_startX(docW,colW,gutW){
		if( colW + gutW > docW ) alert("The Canvas Width is too less(must >80px).");
		else {
			var numCols  = Math.floor( docW / (colW + gutW) );
			var startX = (colW + docW % (colW + gutW)) / 2 ;
		}
		return {numCols:numCols,startX:startX};
	}

	function extra(startX,gutterWidth){//
		var total = startX;
		var unitW = gutterWidth / 2;
		while(total>0){
			doc.guides.add(Direction.VERTICAL, total - unitW);
			doc.guides.add(Direction.VERTICAL, docWidth - (total - unitW));
			total -= unitW;
		}
		return true;
	}

}

flexibleGrid();