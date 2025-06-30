"use client"

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'davinci/primitives';
import { useProjects } from '../queries/use-projects';

interface ProjectSelectProps {
  onSelect?: (projectId: string | null) => void;
  selectedId?: string | null;
}

export function ProjectSelect({ 
  onSelect, 
  selectedId, 
}: ProjectSelectProps) {
  const { data, loading, error } = useProjects({});
  const projects = data?.projects ?? [];
  const selectedProject = selectedId 
    ? projects.find(p => p.id === selectedId) 
    : null;

  const handleProjectSelect = (projectId: string) => {
    // Convert empty string to null for "All Projects" selection
    const value = projectId === '' ? null : projectId;
    onSelect?.(value);
  };

  return (
    <Select
      value={selectedProject?.id ?? undefined}
      onValueChange={handleProjectSelect}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a project...">
          {selectedProject ? (
            <div className="flex flex-col items-start">
              <span className="font-medium">{selectedProject.title}</span>
            </div>
          ) : (
            'Select a project...'
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            <div className="flex flex-col items-start">
              <span className="font-medium">{project.title}</span>
              <span className="text-xs text-muted-foreground truncate">{project.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
