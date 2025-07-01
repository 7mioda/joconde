'use client';

import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'davinci/primitives';
import { useTeamMembers } from '../../queries/use-team-members';

interface TeamMemberSelectProps {
    onSelect: (memberId: string | null) => void;
    selectedId: string | null;
}

export function TeamMemberSelect({ onSelect, selectedId }: TeamMemberSelectProps) {
    const { data, loading, error } = useTeamMembers({});
    console.log('data', { data, loading, error });
    const teamMembers = data?.members ?? [];
    const selectedMember = selectedId 
    ? teamMembers.find(p => p.id === selectedId) 
    : undefined;

    const handleSelect = (memberId: string) => {
        onSelect(memberId);
    }

    return (
            <Select value={selectedMember?.id ?? undefined} onValueChange={handleSelect}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a team member">
                        {selectedMember ? (
                            <div className="flex items-center gap-3">
                                <Image 
                                    src={selectedMember.avatar} 
                                    alt={selectedMember.name}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                />
                                <span className="font-medium">{selectedMember.name}</span>
                            </div>
                        ) : (
                            'Select a team member'
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id} onClick={() => onSelect(member.id)}>
                            <div className="flex items-center gap-3">
                                <Image 
                                    src={member.avatar} 
                                    alt={member.name}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                />
                                <div className="flex flex-col">
                                    <span className="font-medium">{member.firstname} {member.lastname}</span>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
    );
}