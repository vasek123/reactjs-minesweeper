


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
        field[y].push(Math.random() < (diff / 10) + 0.2);
      }
    }

    return field;
  },

  componentWillMount: function () {
    this.setState({ field: this.createMineField() });
  },

  render: function () {
    return (
      <div className='mines-container'>
        <MinesCount />
        <MinesGrid field={this.state.field} />
      </div>
    )
  }

})


/*
 *  MinesGrid Component
*/

const MinesCount = React.createClass({

  render: function () {
    return (
      <div className='mines-count'></div>
    )
  }

})


/*
 *  MinesGrid Component
*/

const MinesGrid = React.createClass({

  render: function () {
    var rows = this.props.field.map(function (row, index) {
      return <MinesRow key={index} rowIndex={index} row={row} />;
    });
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
    var rowIndex = this.props.rowIndex, rowLength = this.props.row.length;
    var mines = this.props.row.map(function (mine, index) {
      return <MineBox key={(rowIndex * rowLength) + index} mineIndex={(rowIndex * rowLength) + index} mine={mine} />
    });
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
    return (
      <div className='mine-box'>
        <span>{this.props.mineIndex}</span>
      </div>
    )
  }

})




/*
 *  Render <Mines />
*/

ReactDOM.render(<Mines />, document.getElementById('app'));
