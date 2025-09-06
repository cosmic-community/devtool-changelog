// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  published_at: string;
}

// Release object type
export interface Release extends CosmicObject {
  type: 'releases';
  metadata: {
    version: string;
    release_date: string;
    summary?: string;
    changes: string;
    breaking_changes?: string;
    release_type: {
      key: ReleaseType;
      value: string;
    };
    categories?: Category[];
    components?: Component[];
    featured: boolean;
  };
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Component object type
export interface Component extends CosmicObject {
  type: 'components';
  metadata: {
    name: string;
    description?: string;
  };
}

// Release type literals (must match content model exactly)
export type ReleaseType = 'major' | 'minor' | 'patch' | 'hotfix';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isRelease(obj: CosmicObject): obj is Release {
  return obj.type === 'releases';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isComponent(obj: CosmicObject): obj is Component {
  return obj.type === 'components';
}

// Utility types
export type CreateReleaseData = Omit<Release, 'id' | 'created_at' | 'modified_at' | 'status' | 'published_at'>;
export type ReleaseWithDetails = Release & {
  metadata: {
    categories: Category[];
    components: Component[];
  } & Release['metadata'];
};