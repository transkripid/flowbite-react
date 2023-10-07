'use client';

import type { FC } from 'react';
import { DocsContentLayout } from '~/app/components/docs-content-layout';
import KbdDocs from './kbd.mdx';

const FormsPageContent: FC = () => {
  return (
    <DocsContentLayout
      title="React KBD (Keyboard) - Flowbite"
      description="Use the KBD component as an inline element to denote textual user input from the keyboard inside paragraphs, tables, and other components"
    >
      <KbdDocs />
    </DocsContentLayout>
  );
};

export default FormsPageContent;
