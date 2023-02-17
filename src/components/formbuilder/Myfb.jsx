import React from "react";
import Builder from "./Builder";
class Myfb extends React.Component {

  builderRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      splitBuilder: false,
    }
  }

  toggleSplitBuilder = () => {
    this.setState({ splitBuilder: !this.state.splitBuilder })
  }

  render() {
    const { splitBuilder } = this.state;
    const splitProps = {
      isSplit: this.state.splitBuilder,
      toggleSplit: this.toggleSplitBuilder
    }

    return (
      <div className="App">
        <div className={("builders" + (splitBuilder ? " split" : ""))}>
          <Builder {...splitProps}/>
          {splitBuilder && <Builder {...splitProps}/>}
        </div>
      </div>
    );
  }
}

export default Myfb;