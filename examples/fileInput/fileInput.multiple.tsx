import { type CodeData } from '~/components/code-demo';
import { FileInput, Label } from '~/src';

const code = `
'use client';

import { FileInput, Label } from 'flowbite-react';

function Component() {
  return (
    <div>
      <div>
        <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
      </div>
      <FileInput id="multiple-file-upload" multiple />
    </div>
  );
}
`;

const codeRSC = `

import { FileInput, Label } from 'flowbite-react';

function Component() {
  return (
    <div>
      <div>
        <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
      </div>
      <FileInput id="multiple-file-upload" multiple />
    </div>
  );
}
`;

function Component() {
  return (
    <div>
      <div>
        <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
      </div>
      <FileInput id="multiple-file-upload" multiple />
    </div>
  );
}

export const multiple: CodeData = {
  type: 'single',
  code: [
    {
      fileName: 'client',
      language: 'tsx',
      code,
    },
    {
      fileName: 'server',
      language: 'tsx',
      code: codeRSC,
    },
  ],
  githubSlug: 'fileInput/fileInput.multiple.tsx',
  component: <Component />,
};
