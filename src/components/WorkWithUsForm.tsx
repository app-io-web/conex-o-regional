import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, MessageSquare, Briefcase, FileText, GraduationCap, CheckCircle, Plus, Minus, Upload } from "lucide-react";

const steps = [
  { id: 1, title: "Dados Pessoais", icon: User },
  { id: 2, title: "Mensagem", icon: MessageSquare },
  { id: 3, title: "Área de Interesse", icon: Briefcase },
  { id: 4, title: "Currículo", icon: FileText },
  { id: 5, title: "Formação", icon: GraduationCap },
  { id: 6, title: "Confirmação", icon: CheckCircle },
];

interface Experience {
  description: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
}

const WorkWithUsForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    areaInteresse: "",
    curriculo: null as File | null,
    areaEstudo: "",
    dataInicioFormacao: "",
    dataFimFormacao: "",
    cursoAndamento: false,
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    { description: "", startDate: "", endDate: "", currentJob: false }
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, curriculo: file }));
  };

  const addExperience = () => {
    if (experiences.length < 5) {
      setExperiences([...experiences, { description: "", startDate: "", endDate: "", currentJob: false }]);
    }
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Experiences:", experiences);
    alert("Candidatura enviada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Trabalhe Conosco
          </h1>
          <p className="text-muted-foreground">
            Faça parte da nossa equipe
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs mt-1 hidden md:block ${
                      currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-1 mx-1 md:mx-2 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Dados Pessoais</h2>
                <p className="text-muted-foreground text-sm">Preencha seus dados de contato.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Mensagem */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Mensagem</h2>
                <p className="text-muted-foreground text-sm">Conte um pouco sobre você ou sua motivação.</p>
              </div>

              <div>
                <Label htmlFor="mensagem">Sua Mensagem *</Label>
                <Textarea
                  id="mensagem"
                  value={formData.mensagem}
                  onChange={(e) => handleInputChange("mensagem", e.target.value)}
                  placeholder="Escreva sobre você, suas motivações e por que deseja fazer parte da nossa equipe..."
                  className="mt-1 min-h-[200px]"
                />
              </div>
            </div>
          )}

          {/* Step 3: Área de Interesse */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Área de Interesse</h2>
                <p className="text-muted-foreground text-sm">Escolha a área que você deseja atuar:</p>
              </div>

              <div>
                <Label htmlFor="areaInteresse">Selecione uma área *</Label>
                <Select
                  value={formData.areaInteresse}
                  onValueChange={(value) => handleInputChange("areaInteresse", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione uma área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desenvolvedor">Desenvolvedor</SelectItem>
                    <SelectItem value="atendimento">Atendimento</SelectItem>
                    <SelectItem value="tecnico">Técnico de Campo</SelectItem>
                    <SelectItem value="instalacoes">Instalações</SelectItem>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="banco-talentos">Banco de Talentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Currículo */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Currículo</h2>
                <p className="text-muted-foreground text-sm">Anexe seu currículo para análise.</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="curriculo"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="curriculo" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-foreground font-medium">
                    {formData.curriculo ? formData.curriculo.name : "Arraste seu currículo aqui"}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Ou clique aqui para selecionar um arquivo.
                  </p>
                  <p className="text-muted-foreground text-xs mt-2">
                    Formatos aceitos: PDF, DOC, DOCX
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Formação e Experiências */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Formação</h2>
                <p className="text-muted-foreground text-sm">Informe seus dados acadêmicos.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="areaEstudo">Área de Estudo</Label>
                  <Input
                    id="areaEstudo"
                    value={formData.areaEstudo}
                    onChange={(e) => handleInputChange("areaEstudo", e.target.value)}
                    placeholder="Ex: Tecnologia da Informação"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataInicioFormacao">Data de Início</Label>
                    <Input
                      id="dataInicioFormacao"
                      type="date"
                      value={formData.dataInicioFormacao}
                      onChange={(e) => handleInputChange("dataInicioFormacao", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataFimFormacao">Data de Finalização</Label>
                    <Input
                      id="dataFimFormacao"
                      type="date"
                      value={formData.dataFimFormacao}
                      onChange={(e) => handleInputChange("dataFimFormacao", e.target.value)}
                      disabled={formData.cursoAndamento}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cursoAndamento"
                    checked={formData.cursoAndamento}
                    onCheckedChange={(checked) => handleInputChange("cursoAndamento", checked as boolean)}
                  />
                  <Label htmlFor="cursoAndamento" className="text-sm font-normal">
                    Curso em andamento
                  </Label>
                </div>
              </div>

              {/* Experiências */}
              <div className="border-t border-border pt-6 mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Experiências Relevantes</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Adicione suas experiências profissionais mais relevantes:
                </p>

                {experiences.map((exp, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-foreground">Experiência {index + 1}</span>
                      {experiences.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, "description", e.target.value)}
                          placeholder="Descreva sua experiência..."
                          maxLength={150}
                          className="min-h-[80px]"
                        />
                        <p className="text-xs text-muted-foreground text-right mt-1">
                          {exp.description.length} / 150
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Data de Início</Label>
                          <Input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Data de Fim</Label>
                          <Input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                            disabled={exp.currentJob}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`currentJob-${index}`}
                          checked={exp.currentJob}
                          onCheckedChange={(checked) => updateExperience(index, "currentJob", checked as boolean)}
                        />
                        <Label htmlFor={`currentJob-${index}`} className="text-sm font-normal">
                          Emprego atual
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}

                {experiences.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addExperience}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Experiência
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Confirmação */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Confirmação</h2>
                <p className="text-muted-foreground text-sm">Confira seus dados antes de enviar:</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Dados Pessoais</span>
                  <span className="text-muted-foreground text-sm ml-auto">{formData.nome || "Não preenchido"}</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Mensagem</span>
                  <span className="text-muted-foreground text-sm ml-auto">
                    {formData.mensagem ? `${formData.mensagem.substring(0, 30)}...` : "Não preenchido"}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Currículo</span>
                  <span className="text-muted-foreground text-sm ml-auto">
                    {formData.curriculo?.name || "Não anexado"}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Formação</span>
                  <span className="text-muted-foreground text-sm ml-auto">
                    {formData.areaEstudo || "Não preenchido"}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Experiências</span>
                  <span className="text-muted-foreground text-sm ml-auto">
                    {experiences.filter(e => e.description).length} experiência(s)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Voltar
            </Button>

            {currentStep < steps.length ? (
              <Button type="button" onClick={nextStep}>
                Próximo
              </Button>
            ) : (
              <Button type="button" variant="hero" onClick={handleSubmit}>
                Enviar Candidatura
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUsForm;
