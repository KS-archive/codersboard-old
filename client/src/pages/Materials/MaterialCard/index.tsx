import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { IMaterial } from '../store/withMaterials';
import withMyCredentials, { IWithMyCredentials, ICredential } from '../store/withMyCredentials';
import CardDescription from '../CardDescription';
import { MaterialCardContainer, CoverImage } from './styles';

const { Meta } = Card;

class MaterialCard extends PureComponent<IProps, IState> {
  credentials?: ICredential;

  state = {
    hasCredentials: false,
  };

  componentDidMount() {
    if (!this.props.myCredentialsLoading) {
      this.initializeCredentials();
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.myCredentialsLoading && !this.props.myCredentialsLoading) {
      this.initializeCredentials();
    }
  }

  initializeCredentials = () => {
    const { myCredentials, credential } = this.props;

    const credentialsIds = myCredentials.map(c => c.id);
    const credentialData: any = myCredentials.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
    const hasCredentials = (credential && credentialsIds.includes(credential.id)) || !credential;

    if (hasCredentials && credential) {
      this.credentials = {
        login: credentialData[credential.id].login,
        password: credentialData[credential.id].password,
        name: credentialData[credential.id].name,
      };
    }

    this.setState({ hasCredentials });
  };

  render() {
    const { id, title, image, url, description, tags } = this.props;
    const { hasCredentials } = this.state;
    const descriptionProps = { description, url, tags, credentials: this.credentials };

    return (
      <MaterialCardContainer
        hoverable={hasCredentials}
        key={id}
        cover={<CoverImage locked={!hasCredentials} src={image} />}
      >
        <Meta title={title} description={<CardDescription {...descriptionProps} />} />
      </MaterialCardContainer>
    );
  }
}

interface IProps extends IMaterial, IWithMyCredentials {}

interface IState {
  hasCredentials: boolean;
}

export default withMyCredentials(MaterialCard);
