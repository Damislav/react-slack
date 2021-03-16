import React, { Component } from "react";
import {
  Grid,
  GridRow,
  GridColumn,
  Header,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
class UserPanel extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    this.setState({
      user: this.props.currentUser,
    });
  };
  dropdownOptions = () => [
    {
      text: (
        <span>
          Signed in as{" "}
          <strong>{this.state.user && this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true,
      key: "user",
    },

    {
      text: <span>Change Avatar</span>,
    },
    {
      key: "sign out",
      text: <span onClick={this.handleSignout}>Sign out</span>,
    },
  ];
  handleSignout = () => {
    firebase.auth().signOut().then();
  };

  render() {
    return (
      <Grid style={{ background: "#4c4c4c" }}>
        <GridColumn>
          <GridRow style={{ padding: "1.2rem", margin: "0" }}>
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>
          </GridRow>
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </GridColumn>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(UserPanel);
