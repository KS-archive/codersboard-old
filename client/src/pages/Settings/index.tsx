import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { withMe, MeProps } from 'store/user/queries/Me';

import { ReactComponent as User } from 'static/fa/regular/user.svg';
import { ReactComponent as Sitemap } from 'static/fa/regular/sitemap.svg';
import { ReactComponent as Vials } from 'static/fa/regular/vials.svg';

import Account from './Account';
import Integrations from './Integrations';
import Skills from './Skills';

import { Icon } from 'components';
import { Container, Content, MenuItem, Text } from './styles';

const checkHash = () => {
  if (!window.location.hash) {
    const { origin, pathname } = window.location;
    window.location.replace(`${origin}${pathname}#account`);
  }
};

const changeHash = (param: ClickParam, setHash: React.Dispatch<React.SetStateAction<string>>) => {
  const { hash, origin, pathname } = window.location;

  if (hash !== param.key) {
    window.location.replace(`${origin}${pathname}${param.key}`);
    setHash(window.location.hash);
  }
};

const renderContent = (hash: string, me: MeProps) => {
  switch (hash) {
    case '#account':
      return <Account me={me} />;

    case '#integrations':
      return <Integrations me={me} />;

    case `#skills`:
      return <Skills me={me} />;

    default:
      return null;
  }
};

const Settings: React.FC<Props> = ({ me }) => {
  checkHash();
  const [hash, setHash] = useState(window.location.hash);
  const handleItemChange = (param: ClickParam) => changeHash(param, setHash);


  return (
    <Row gutter={24}>
      <Col span={24}>
        <Container>
          <Menu style={{ width: 256 }} selectedKeys={[hash]}>
            <MenuItem key="#account" onClick={handleItemChange}>
              <Icon icon={User} />
              <Text>Ustawienia konta</Text>
            </MenuItem>
            <MenuItem key="#integrations" onClick={handleItemChange}>
              <Icon icon={Sitemap} />
              <Text>Integracje</Text>
            </MenuItem>
            <MenuItem key="#skills" onClick={handleItemChange}>
              <Icon icon={Vials} />
              <Text>Umiejętności</Text>
            </MenuItem>
          </Menu>
          <Content>
            {me ? renderContent(hash, me) : 'Loading...'}
          </Content>
        </Container>
      </Col>
    </Row>
  );
};

interface Props {
  me: MeProps;
}

export default withMe(Settings);
