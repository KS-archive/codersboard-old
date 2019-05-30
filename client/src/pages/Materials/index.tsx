import React, { Component } from 'react';
import { Typography, Spin, Modal, Empty } from 'antd';
import withMaterials, { IMaterial } from './store/withMaterials';
import MaterialCard from './MaterialCard';
import AddMaterial from './AddMaterial';
import SearchBar from './SearchBar';
import Loader from 'components/Loader';
import { MaterialsContainer, Header, AddButton, Grid, Wrapper } from './styles';

const { Title } = Typography;

class Materials extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      modal: false,
      filteredMaterials: [],
      searchedMaterials: [],
      displayed: [],
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.props.materials !== prevProps.materials) {
      this.setState({
        searchedMaterials: this.props.materials,
        filteredMaterials: this.props.materials,
        displayed: this.props.materials,
      });
    }
  }

  setSearched = (newMaterials: IMaterial[]) => {
    this.setState({ searchedMaterials: newMaterials });
    this.setState({ displayed: newMaterials });
  };

  setFiltered = (newMaterials: IMaterial[]) => {
    this.setState({ filteredMaterials: newMaterials });
    this.setState({ displayed: newMaterials });
  };

  renderMaterials() {
    const { searchedMaterials, filteredMaterials } = this.state;
    console.log('searched: ', searchedMaterials);
    console.log('filtered: ', filteredMaterials);
    if ((searchedMaterials.length === 0 || filteredMaterials.length === 0) && !this.props.materialsLoading) {
      return <Empty description="Brak wyników wyszukiwania" />;
    }
    if (searchedMaterials.length !== 0 && searchedMaterials.length < filteredMaterials.length) {
      const materials = searchedMaterials.map((material: IMaterial) => (
        <MaterialCard key={material.id} {...material} />
      ));
      return <Grid>{materials}</Grid>;
    }
    if (filteredMaterials) {
      const materials = filteredMaterials.map((material: IMaterial) => (
        <MaterialCard key={material.id} {...material} />
      ));
      return <Grid>{materials}</Grid>;
    }
    return Loader;
  }

  render() {
    return (
      <MaterialsContainer>
        <Header>
          <SearchBar
            setSearched={this.setSearched}
            setFiltered={this.setFiltered}
            materials={this.props.materials}
            filteredMaterials={this.state.filteredMaterials}
          />
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
}

interface IState {
  modal: boolean;
  filteredMaterials: any;
  searchedMaterials: any;
  displayed: any;
}

export default withMaterials(Materials);
