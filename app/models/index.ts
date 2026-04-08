export { isKnowledgeCard, getCardTitle, getCardDescription, toCardDisplay } from "./KnowledgeCard"
export type { KnowledgeCard, KnowledgeCardDisplay, Category, CardMetadata } from "./KnowledgeCard"

// Mock data (for development/testing only)
export {
  createMockCard,
  createMockCategory,
  MOCK_CATEGORIES,
  MOCK_KNOWLEDGE_CARDS,
} from "./__mocks__/knowledgeCards"
