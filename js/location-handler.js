// Handler para seleção de localização (Província e Distrito)
import apiService from '../api/apiService.js';

class LocationHandler {
    constructor(provinceSelectId, districtSelectId) {
        this.provinceSelect = document.getElementById(provinceSelectId);
        this.districtSelect = document.getElementById(districtSelectId);
        this.provinces = [];
        this.districts = [];
    }

    // Inicializar
    async init() {
        await this.loadProvinces();
        this.setupEventListeners();
    }

    // Carregar províncias
    async loadProvinces() {
        try {
            this.provinces = await apiService.getProvinces();
            this.renderProvinces();
        } catch (error) {
            console.error('Erro ao carregar províncias:', error);
            this.showError('Erro ao carregar províncias');
        }
    }

    // Renderizar províncias no select
    renderProvinces() {
        if (!this.provinceSelect) return;

        this.provinceSelect.innerHTML = '<option value="">Selecione uma província</option>';
        
        this.provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province.id;
            option.textContent = province.nome;
            this.provinceSelect.appendChild(option);
        });
    }

    // Carregar distritos de uma província
    async loadDistricts(provinceId) {
        try {
            this.districts = await apiService.getDistricts(provinceId);
            this.renderDistricts();
        } catch (error) {
            console.error('Erro ao carregar distritos:', error);
            this.showError('Erro ao carregar distritos');
        }
    }

    // Renderizar distritos no select
    renderDistricts() {
        if (!this.districtSelect) return;

        this.districtSelect.innerHTML = '<option value="">Selecione um distrito</option>';
        this.districtSelect.disabled = false;
        
        this.districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.id;
            option.textContent = district.nome;
            this.districtSelect.appendChild(option);
        });
    }

    // Configurar event listeners
    setupEventListeners() {
        if (this.provinceSelect) {
            this.provinceSelect.addEventListener('change', (e) => {
                const provinceId = e.target.value;
                
                if (provinceId) {
                    this.loadDistricts(provinceId);
                } else {
                    this.districtSelect.innerHTML = '<option value="">Selecione um distrito</option>';
                    this.districtSelect.disabled = true;
                }
            });
        }
    }

    // Obter província selecionada
    getSelectedProvince() {
        return this.provinceSelect?.value || null;
    }

    // Obter distrito selecionado
    getSelectedDistrict() {
        return this.districtSelect?.value || null;
    }

    // Validar seleção
    validate() {
        if (!this.getSelectedProvince()) {
            this.showError('Por favor, selecione uma província');
            return false;
        }
        
        if (!this.getSelectedDistrict()) {
            this.showError('Por favor, selecione um distrito');
            return false;
        }
        
        return true;
    }

    // Mostrar erro
    showError(message) {
        alert(message); // Você pode substituir por um toast ou modal
    }
}

export default LocationHandler;
