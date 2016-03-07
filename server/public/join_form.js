var Alert = ReactBootstrap.Alert;
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;
var Panel = ReactBootstrap.Panel;

var FormTitle = (
  <div className="text-center">Create Account</div>
);

var JoinForm = React.createClass({
    nameText: 'Name',
    nameBgText: 'Enter your user name',
    passwordText: 'Password',
    passwordBgText: 'Enter your password',
    url: '',
    panelStyle: {maxWidth: 400, margin: '0 auto 10px', marginTop: '25px'},

    getInitialState() {
      return {
        nameValue: '',
        passwordValue: '',
        comment: '',
      };
    },
    handleNameChange(e) {
      this.setState({nameValue: e.target.value});
    },
    handlePasswordChange(e) {
      this.setState({passwordValue: e.target.value});
    },
    handleSubmit(e) {
      e.preventDefault();
      var data = {
        name: this.state.nameValue,
        password: this.state.passwordValue
      };
      $.ajax({
          url: this.url,
          type:'POST',
          contentType:'application/json',
          dataType: 'json',
          data: JSON.stringify(data),
          success: function(res) {
            var message = res.message;
            var redirect = res.redirect;
            if (message) this.setState({comment: message});
            if (redirect) window.location = redirect;
          }.bind(this),
          error: function(xhr, status, err) {
            this.setState({comment: status});
          }.bind(this)
      });
    },
    render() {
      return (
       <Panel style={this.panelStyle} header={FormTitle}>
         <form onSubmit={this.handleSubmit}>
	   {(() => {
	    if (this.state.comment) {
              return (
	       <Alert bsStyle="danger" className="text-center">
	       {this.state.comment}
	       </Alert>
	      );
	    } 
	   })()}
	   <Input
	     type="text" name="name"
	     label={this.nameText}
	     placeholder={this.nameBgText}
	     value={this.state.nameValue}
	     onChange={this.handleNameChange} />
	   <Input
	     type="password" name="password"
	     label={this.passwordText}
	     placeholder={this.passwordBgText}
	     value={this.state.passwordValue}
	     onChange={this.handlePasswordChange} />
	   <ButtonInput
	     type="submit"
	     className="center-block"
	     bsStyle="primary"
	     value="Create" />

	   
         </form>
       </Panel>
      );
    }
});

var Join = React.createClass({
    render() {
      return (
        <div>
            <JoinForm />
        </div>
      );
    }
});

ReactDOM.render(
  <Join />,
  document.getElementById('content')
);