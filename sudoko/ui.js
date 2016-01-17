/*
 * Constructs Sudoku grid UI and responds to key and mouse events
 */

var model = {
	
	Cell: (function invocation() {
		function Cell(row, col, parentBlock, domElem) {
			this.row = row;
			this.col = col;
			this.parentBlock = parentBlock;
			this.domElem = domElem;
			console.log('created: ' + this.toString());
			
			domElem.addEventListener('click', function() {
				return this.obj.select();
			});
		};
		
		Cell.prototype = {
			select: function() {
				console.log('select: ' + this.toString());
				this.domElem.className = 'selected';
				if(gridState.selectedCell != null) {
					gridState.selectedCell.deselect();
				}
				gridState.selectedCell = this;
			},
			
			deselect: function() {
				this.domElem.className = '';
			},
			
			toString: function() {
				return 'Cell(' + this.row + ', ' + this.col + ', ' + this.parentBlock + ')';
			}
		}
		
		return Cell;
	}()),
	
	GridState: function() {
		this.selectedCell = null;
	}

};



// Global grid state
var gridState = new model.GridState();


var ui = {

	buildTable: function(rows, cols, parent) {
		var r, c, cell, row,
			tbl = document.createElement('table');
		tbl.className = 'inner';
		
		for(r=1; r<=rows; r++) {
			row = document.createElement('tr');
			for(c=1; c<=cols; c++) {
				cell = document.createElement('td');
				cell.width = 40;
				cell.height = 40;
				cell.obj = new model.Cell(r, c, parent, cell);
				row.appendChild(cell);
			}
			tbl.appendChild(row);	
		}
		return tbl;
	},
	
	buildSudokuGrid: function() {
		var r, c, row, cell, grid, tbl;
		
		grid = document.getElementById('grid');
		tbl = document.createElement('table');
		
		for(r=1; r<=3; r++) {
			row = document.createElement('tr');
			for(c=1; c<=3; c++) {
				cell = document.createElement('td');
				cell.appendChild( ui.buildTable(3, 3, r*c) );
				row.appendChild(cell);
			}
			tbl.appendChild(row);	
		}
		grid.appendChild(tbl);
	}
	
};


window.onload = function() {
	// This is the entry point and is called once the dom is initialized
	ui.buildSudokuGrid();
	
}
