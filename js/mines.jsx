


/*
 *  The 'main' Mines Component
*/

const Mines = React.createClass({

  getDefaultProps: function () {
    return {
      width: 6,
      height: 6,
      diff: 4
    }
  },

  //CREATE MINE FIELD
  createMineField: function () {
    let width = this.props.width,
        height = this.props.height,
        diff = this.props.diff,
        field = [];

    for (let y = 0; y < height; y++) {
      field.push([]);
      for (let x = 0; x < width; x++) {
        field[y].push({
          mine: (Math.random() < (diff / 10) - 0.2),
          covered: true,
          flagged: false
        })
      }
    }

    return field;
  },

  componentWillMount: function () {
    this.setState({ field: this.createMineField() });
  },

  handleMineLeftClick: function (event, id) {
    //UPDATE FIELD AND UNCOVER BOX
    var updatedField = this.state.field;
    var y = Math.floor(id / this.props.width), x = id % this.props.width;
    if (!updatedField[y][x].flagged) {
      updatedField[y][x].covered = false;
    }
    this.setState({ field: updatedField });
  },

  handleMineRightClick: function (event, id) {
    //PREVENT CONTEXT MENU FROM APPEARING
    event.preventDefault();

    //UPDATE FIELD AND TOGGLE FLAG
    var updatedField = this.state.field;
    var y = Math.floor(id / this.props.width), x = id % this.props.width;
    if (updatedField[y][x].covered) {
      updatedField[y][x].flagged = !updatedField[y][x].flagged;
    }
    this.setState({ field: updatedField });
  },

  render: function () {
    return (
      <div className='mines-container'>
        <MinesCount field={this.state.field} />
        <MinesGrid field={this.state.field} handleMineLeftClick={this.handleMineLeftClick} handleMineRightClick={this.handleMineRightClick}/>
      </div>
    )
  }

})


/*
 *  MinesGrid Component
*/

const MinesCount = React.createClass({

  render: function () {
    var bombCount = 0;
    var flagCount = 0;
    this.props.field.map(function (row) {
      row.map(function (mine) {
        if (mine.mine) bombCount++;
        if (mine.flagged) flagCount++;
      })
    })
    return (
      <div className='mines-count'>{bombCount - flagCount < 0 ? 0 : bombCount - flagCount}</div>
    )
  }

})


/*
 *  MinesGrid Component
*/

const MinesGrid = React.createClass({

  render: function () {
    var rows = this.props.field.map(function (row, index) {
      return <MinesRow key={index} rowIndex={index} row={row} handleMineLeftClick={this.props.handleMineLeftClick} handleMineRightClick={this.props.handleMineRightClick}/>;
    }, this);
    return (
      <div className='mines-grid'>
        {rows}
      </div>
    )
  }

})


/*
 *  MinesRow Component
*/

const MinesRow = React.createClass({

  render: function () {
    var rowIndex = this.props.rowIndex, rowLength = this.props.row.length, handleMineLeftClick = this.props.handleMineLeftClick;
    var mines = this.props.row.map(function (mine, index) {
      return <MineBox key={(rowIndex * rowLength) + index} mineIndex={(rowIndex * rowLength) + index} mine={mine} handleMineLeftClick={this.props.handleMineLeftClick} handleMineRightClick={this.props.handleMineRightClick}/>
    }, this);
    return (
      <div className='mines-row'>
        {mines}
      </div>
    )
  }

})


/*
 *  MineBox Component
*/

const MineBox = React.createClass({

  render: function () {
    var content = '';

    if (this.props.mine.flagged) {
      content = <span className='fa fa-flag'></span>
    } else if (!this.props.mine.covered && this.props.mine.mine) {
      content = <span className='fa fa-bomb'></span>
    } else if (!this.props.mine.covered) {
      content = <span className='fa fa-check'></span>
    }

    return (
      <div className='mine-box' onClick={(event) => this.props.handleMineLeftClick(event, this.props.mineIndex)} onContextMenu={(event) => this.props.handleMineRightClick(event, this.props.mineIndex)}>
        {content}
      </div>
    )
  }

})




/*
 *  Render <Mines />
*/

ReactDOM.render(<Mines diff={8} />, document.getElementById('app'));
