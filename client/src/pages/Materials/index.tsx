import React, { Component } from 'react';
import { Typography, Spin, Modal, Empty } from 'antd';
import withMaterials, { IMaterial } from './store/withMaterials';
import MaterialCard from './MaterialCard';
import AddMaterial from './AddMaterial';
import SearchBar from './SearchBar';
import Filters from './Filters';
import Loader from 'components/Loader';
import { MaterialsContainer, Header, AddButton, Grid, Wrapper } from './styles';

const { Title } = Typography;

const intersection = (a: any[], b: any[]) => {

  const s = new Set(b);

  return a.filter((x: string) => s.has(x));

};

class Materials extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      modal: false,
      filteredMaterials: [],
      searchedMaterials: [],
      displayedMaterials: [],
    };
  }

  componentDidMount() {
    if (this.props.materials) {
      this.setState({
        searchedMaterials: this.props.materials,
        filteredMaterials: this.props.materials,
        displayedMaterials: this.props.materials,
      });
    }
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.props.materials !== prevProps.materials) {
      this.setState({
        searchedMaterials: this.props.materials,
        filteredMaterials: this.props.materials,
        displayedMaterials: this.props.materials,
      });
    }
    if (
      prevState.filteredMaterials.length !== this.state.filteredMaterials.length ||
      prevState.searchedMaterials.length !== this.state.searchedMaterials.length
    ) {
      this.setState({ displayedMaterials: intersection(this.state.searchedMaterials, this.state.filteredMaterials) });
    }
  }

  setSearched = (newMaterials: IMaterial[]) => {
    this.setState({ searchedMaterials: newMaterials });
  };

  setFiltered = (newMaterials: IMaterial[]) => {
    this.setState({ filteredMaterials: newMaterials });
  };

  renderMaterials() {
    const { displayedMaterials: displayed } = this.state;
    if (displayed.length === 0 && !this.props.materialsLoading) {
      return <Empty description="Brak wyników wyszukiwania" />;
    }
    if (this.props.materialsLoading) {
      return Loader;
    }
    const materials = displayed.map((material: IMaterial) => <MaterialCard key={material.id} {...material} />);
    return <Grid>{materials}</Grid>;
  }

  render() {
    return (
      <MaterialsContainer>
        <Header>
          <SearchBar setSearched={this.setSearched} materials={this.props.materials} />
          <Filters setFiltered={this.setFiltered} materials={this.props.materials} url={this.props.match.url} />
          <Wrapper>
            <Title level={2}>Materiały</Title>
            <AddButton type="primary" onClick={(): void => this.setState({ modal: true })}>
              Dodaj materiał
            </AddButton>
          </Wrapper>
        </Header>
        <Spin tip="Wczytywanie materiałów..." spinning={this.props.materialsLoading}>
          {this.renderMaterials()}
        </Spin>
        <Modal
          title="Dodaj nowy materiał"
          footer={null}
          visible={this.state.modal}
          onCancel={(): void => this.setState({ modal: false })}
        >
          <AddMaterial hideModal={(): void => this.setState({ modal: false })} />
        </Modal>
      </MaterialsContainer>
    );
  }
}

interface IProps {
  materials: IMaterial[];
  materialsLoading: boolean;
  match: {
    url: string;
  };
}

interface IState {
  modal: boolean;
  filteredMaterials: IMaterial[];
  searchedMaterials: IMaterial[];
  displayedMaterials: IMaterial[];
}

export default withMaterials(Materials);
