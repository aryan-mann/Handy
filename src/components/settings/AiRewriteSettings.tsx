import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsGroup } from "../ui/SettingsGroup";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { SettingContainer } from "../ui/SettingContainer";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { useSettings } from "../../hooks/useSettings";

export const AiRewriteSettings: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const enabled = getSetting("ai_rewrite_enabled") ?? false;
  const apiKey = getSetting("ai_rewrite_api_key") ?? "";
  const model = getSetting("ai_rewrite_model") ?? "";
  const systemPrompt = getSetting("ai_rewrite_system_prompt") ?? "";

  const [apiKeyDraft, setApiKeyDraft] = useState(apiKey);
  const [modelDraft, setModelDraft] = useState(model);
  const [promptDraft, setPromptDraft] = useState(systemPrompt);

  useEffect(() => {
    setApiKeyDraft(apiKey);
    setModelDraft(model);
    setPromptDraft(systemPrompt);
  }, [apiKey, model, systemPrompt]);

  const handleApiKeyBlur = async () => {
    if (apiKeyDraft === apiKey) return;
    await updateSetting("ai_rewrite_api_key", apiKeyDraft);
  };

  const handleModelBlur = async () => {
    if (modelDraft === model) return;
    await updateSetting("ai_rewrite_model", modelDraft);
  };

  const handlePromptBlur = async () => {
    if (promptDraft === systemPrompt) return;
    await updateSetting("ai_rewrite_system_prompt", promptDraft);
  };

  return (
    <SettingsGroup
      title={t("settings.aiRewrite.title")}
      description={t("settings.aiRewrite.description")}
    >
      <ToggleSwitch
        checked={enabled}
        onChange={(checked) => updateSetting("ai_rewrite_enabled", checked)}
        isUpdating={isUpdating("ai_rewrite_enabled")}
        label={t("settings.aiRewrite.enabled.label")}
        description={t("settings.aiRewrite.enabled.description")}
        grouped
      />

      <SettingContainer
        title={t("settings.aiRewrite.apiKey.title")}
        description={t("settings.aiRewrite.apiKey.description")}
        descriptionMode="tooltip"
        layout="horizontal"
        grouped
      >
        <Input
          type="password"
          value={apiKeyDraft}
          onChange={(e) => setApiKeyDraft(e.target.value)}
          onBlur={handleApiKeyBlur}
          placeholder={t("settings.aiRewrite.apiKey.placeholder")}
          disabled={isUpdating("ai_rewrite_api_key")}
          className="min-w-[320px]"
        />
      </SettingContainer>

      <SettingContainer
        title={t("settings.aiRewrite.model.title")}
        description={t("settings.aiRewrite.model.description")}
        descriptionMode="tooltip"
        layout="horizontal"
        grouped
      >
        <Input
          value={modelDraft}
          onChange={(e) => setModelDraft(e.target.value)}
          onBlur={handleModelBlur}
          placeholder={t("settings.aiRewrite.model.placeholder")}
          disabled={isUpdating("ai_rewrite_model")}
          className="min-w-[240px]"
        />
      </SettingContainer>

      <SettingContainer
        title={t("settings.aiRewrite.systemPrompt.title")}
        description={t("settings.aiRewrite.systemPrompt.description")}
        descriptionMode="tooltip"
        layout="stacked"
        grouped
      >
        <Textarea
          value={promptDraft}
          onChange={(e) => setPromptDraft(e.target.value)}
          onBlur={handlePromptBlur}
          disabled={isUpdating("ai_rewrite_system_prompt")}
          placeholder={t("settings.aiRewrite.systemPrompt.placeholder")}
        />
      </SettingContainer>
    </SettingsGroup>
  );
};
