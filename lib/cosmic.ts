import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all releases with related objects
export async function getReleases() {
  try {
    const response = await cosmic.objects
      .find({ type: 'releases' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    const releases = response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime();
      const dateB = new Date(b.metadata?.release_date || '').getTime();
      return dateB - dateA; // Newest first
    });

    return releases;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch releases');
  }
}

// Get a single release by slug
export async function getRelease(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'releases', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch release: ${slug}`);
  }
}

// Get all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);

    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get all components
export async function getComponents() {
  try {
    const response = await cosmic.objects
      .find({ type: 'components' })
      .props(['id', 'title', 'slug', 'metadata']);

    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch components');
  }
}

// Get featured releases
export async function getFeaturedReleases() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'releases',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    const releases = response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime();
      const dateB = new Date(b.metadata?.release_date || '').getTime();
      return dateB - dateA; // Newest first
    });

    return releases;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured releases');
  }
}

// Get releases by category
export async function getReleasesByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'releases',
        'metadata.categories': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    const releases = response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime();
      const dateB = new Date(b.metadata?.release_date || '').getTime();
      return dateB - dateA; // Newest first
    });

    return releases;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch releases by category');
  }
}