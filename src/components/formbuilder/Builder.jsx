import React from "react";
import { DWKitFormBuilder, DWKitFormViewer } from "./optimajet-builder";
import { builderProps, viewerProps } from "./builder-viewer-props";

const HideIf = ({ condition, ...props }) => <div style={{ display: condition ? "none" : "initial" }} {...props} />

class Builder extends React.Component {

  builderRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      showViewer: false,
      model: undefined
    }
  }

  componentDidMount() {
    this.builderRef?.current?.load('./application-form');
    this.builderRef?.current?.getStore().listen(function (form) {
        // log form data on change
        console.log(JSON.stringify(form, null, 2));
    });
    this.setState({ dataurl: "./application-form-data.json" })
  };

  toggleViewMode = () => {
    const model = this.builderRef?.current?.getData();
    this.setState({ showViewer: !this.state.showViewer, model })
  }

  renderViewer = () => {
    const { model, dataurl } = this.state;
    return (
      <div>
            <div className="dwkit-formbuilder-header"> 
              <div className="dwkit-formbuilder-header-center">
                  <button className="ui button buttontype2" role="button" disabled >Clear</button>
                  <button className="ui button buttontype2" role="button" disabled >Upload</button>
                  <button className="ui button buttontype2" role="button" disabled >Download</button>
                  <button className={("ui button" + (this.props.isSplit ? " primary" : " buttontype2"))} role="button" onClick={this.props.toggleSplit}>Split</button>
                  <button className="ui button primary" role="button" onClick={this.toggleViewMode}>Show Builder</button>
              </div>  
            </div>
          <DWKitFormViewer {...{ ...viewerProps, model, dataurl }} />
      </div>
    )
  }

  render() {
    const { model, showViewer, dataurl } = this.state;
    const { isSplit, toggleSplit } = this.props;
    const extraHeaderButtons = [
      {
        name:"Split",
        className: ("ui button" + (isSplit ? " primary" : " buttontype2")),
        onClick: toggleSplit,
        text: "Split"
      },
      {
        name:"Show Viewer",
        className: "ui button primary",
        onClick: this.toggleViewMode,
        text: "Show Viewer"
      }
    ]


    return (
      <div style={{flex: 1}}>
        {showViewer && this.renderViewer()}
        <HideIf condition={showViewer}>
          <DWKitFormBuilder {...builderProps} model={model} ref={this.builderRef} extraHeaderButtons={extraHeaderButtons}/>
        </HideIf>
      </div>
    );
  }
}

export default Builder;
