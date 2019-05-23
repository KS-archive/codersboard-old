import React from 'react';
import { Tag, Button, Popover } from 'antd';
import { ReactComponent as LockOpen } from 'static/fa/regular/lock-open-alt.svg';
import { ReactComponent as Link } from 'static/fa/regular/link.svg';
import { Icon } from 'components';
import { Description, Buttons } from './styles';

const shorten = (str: string, maxLen: number) => (str.length > maxLen ? `${str.substring(0, maxLen - 3)}...` : str);

const renderTag = ({ name, color }: ITag) => (
  <Tag key={name} color={color}>
    {name}
  </Tag>
);

const renderContent = (login: string, password: string) => (
  <div>
    <p>
      <strong>Login:</strong> {login}
    </p>
    <p>
      <strong>Hasło:</strong> {password}
    </p>
  </div>
);

const CardDescription: React.FC<Props> = ({ description, url, tags, credentials }) => (
  <Description>
    <div>{tags.map(renderTag)}</div>
    <p>{shorten(description, 120)}</p>
    <Buttons>
      {credentials && (
        <Popover
          placement="topLeft"
          title={credentials.name}
          content={renderContent(credentials.login, credentials.password)}
          trigger="click"
        >
          <Button>
            <Icon icon={LockOpen} />
          </Button>
        </Popover>
      )}
      <Button type="primary" target="__blank" href={url}>
        <Icon icon={Link} />
      </Button>
    </Buttons>
  </Description>
);

interface Props {
  description: string;
  url: string;
  tags: ITag[];
  credentials?: ICredentials;
}

interface ICredentials {
  name: string;
  login: string;
  password: string;
}

interface ITag {
  name: string;
  color?: string;
}

export default CardDescription;
