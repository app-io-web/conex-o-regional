import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, X } from 'lucide-react';

const steps = [
  { id: 1, title: 'Dados Pessoais' },
  { id: 2, title: 'Contato' },
  { id: 3, title: 'Endereço' },
  { id: 4, title: 'Plano' },
];

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [extraPhones, setExtraPhones] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    rg: '',
    dataNascimento: '',
    email: '',
    telefone1: '',
    telefone2: '',
    endereco: '',
    cidade: '',
    bairro: '',
    cep: '',
    rua: '',
    tipoResidencia: '',
    numero: '',
    pontoReferencia: '',
    plano: 'Gold',
    cupom: '',
    servicoAdicional: '',
    vendedor: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPhone = () => {
    setExtraPhones(prev => [...prev, '']);
  };

  const removePhone = (index: number) => {
    setExtraPhones(prev => prev.filter((_, i) => i !== index));
  };

  const updateExtraPhone = (index: number, value: string) => {
    setExtraPhones(prev => prev.map((phone, i) => i === index ? value : phone));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { ...formData, extraPhones });
    alert('Cadastro enviado com sucesso!');
  };

  return (
    <section id="cadastro" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ficha de Cadastro
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Preencha seus dados para contratar nosso serviço
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-xl p-6 md:p-10">
          {/* Steps Indicator */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      currentStep > step.id
                        ? 'bg-primary text-primary-foreground'
                        : currentStep === step.id
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`text-xs mt-2 text-center hidden md:block ${
                    currentStep >= step.id ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Dados de Cadastro
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cpfCnpj">CPF ou CNPJ</Label>
                  <Input
                    id="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                    placeholder="000.000.000-00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rg">RG *</Label>
                  <Input
                    id="rg"
                    value={formData.rg}
                    onChange={(e) => handleInputChange('rg', e.target.value)}
                    placeholder="Digite seu RG"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contato */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Contato
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone1">Telefone 1 *</Label>
                  <Input
                    id="telefone1"
                    value={formData.telefone1}
                    onChange={(e) => handleInputChange('telefone1', e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone2">Telefone 2 *</Label>
                  <Input
                    id="telefone2"
                    value={formData.telefone2}
                    onChange={(e) => handleInputChange('telefone2', e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                  />
                </div>
                {extraPhones.map((phone, index) => (
                  <div key={index} className="relative">
                    <Label>Telefone {index + 3}</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={phone}
                        onChange={(e) => updateExtraPhone(index, e.target.value)}
                        placeholder="(00) 00000-0000"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removePhone(index)}
                        className="shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPhone}
                    className="text-primary border-primary hover:bg-primary/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar outro telefone
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Endereço */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Endereço
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="endereco">Digite Seu Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    placeholder="Endereço completo"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    placeholder="Sua cidade"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bairro">Bairro *</Label>
                  <Input
                    id="bairro"
                    value={formData.bairro}
                    onChange={(e) => handleInputChange('bairro', e.target.value)}
                    placeholder="Seu bairro"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rua">Rua *</Label>
                  <Input
                    id="rua"
                    value={formData.rua}
                    onChange={(e) => handleInputChange('rua', e.target.value)}
                    placeholder="Nome da rua"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tipoResidencia">Tipo de Residência *</Label>
                  <Select value={formData.tipoResidencia} onValueChange={(value) => handleInputChange('tipoResidencia', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="propria">Própria</SelectItem>
                      <SelectItem value="alugada">Alugada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => handleInputChange('numero', e.target.value)}
                    placeholder="Nº"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="pontoReferencia">Ponto de Referência:</Label>
                  <Input
                    id="pontoReferencia"
                    value={formData.pontoReferencia}
                    onChange={(e) => handleInputChange('pontoReferencia', e.target.value)}
                    placeholder="Ex: Próximo ao mercado"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Plano */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-3">
                Plano Escolhido
              </h3>
              <div className="space-y-6">
                <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Plano Selecionado:</p>
                      <p className="text-2xl font-bold text-primary">{formData.plano}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-primary border-primary">
                      Alterar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="cupom">Cupom de Desconto (opcional):</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="cupom"
                        value={formData.cupom}
                        onChange={(e) => handleInputChange('cupom', e.target.value)}
                        placeholder="Digite o cupom"
                      />
                      <Button variant="outline" className="shrink-0">
                        Validar
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Valor:</Label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      <span className="text-lg font-semibold text-foreground">R$ 99,90/mês</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="servicoAdicional">Serviço Adicional:</Label>
                    <Select value={formData.servicoAdicional} onValueChange={(value) => handleInputChange('servicoAdicional', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nenhum">Nenhum</SelectItem>
                        <SelectItem value="tv">TV por Assinatura</SelectItem>
                        <SelectItem value="telefone">Telefone Fixo</SelectItem>
                        <SelectItem value="combo">Combo TV + Telefone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vendedor">Vendedor:</Label>
                    <Input
                      id="vendedor"
                      value={formData.vendedor}
                      onChange={(e) => handleInputChange('vendedor', e.target.value)}
                      placeholder="Nome do vendedor"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8"
            >
              Voltar
            </Button>
            {currentStep < 4 ? (
              <Button onClick={nextStep} className="px-8 bg-primary hover:bg-primary/90">
                Próximo
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="px-8 bg-primary hover:bg-primary/90">
                Enviar Cadastro
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
