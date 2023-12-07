import { loadAvailableCharacters, loadCharacter, updateCharacter, loadAvailableSkillTrees, loadSkillTree, selectSkill, acquireSkill, removeSkill } from './BuilderStore.js';
import { expect } from 'chai';

describe('BuilderStore', () => {
    describe('loadAvailableCharacters', () => {
        it('should load available characters', async () => {
            // TODO: Implement test
        });
    });

    describe('loadCharacter', () => {
        it('should load a character by token id', async () => {
            // TODO: Implement test
        });
    });

    describe('updateCharacter', () => {
        it('should update the current character', async () => {
            // Mock the selectedCharacter store
            const mockCharacter = writable({
                id: 1,
                attributes: {
                    selectedAbilities: {
                        data: []
                    }
                }
            });
            selectedCharacter = mockCharacter;

            // Mock the updateEntity function
            updateEntity = sinon.stub().resolves();

            // Call the function
            await updateCharacter();

            // Assert that updateEntity was called with the correct arguments
            expect(updateEntity.calledOnce).to.be.true;
            expect(updateEntity.calledWith('dimm-city/characters', sinon.match.any)).to.be.true;
        });
    });

    describe('loadAvailableSkillTrees', () => {
        it('should load available skill trees', async () => {
            // TODO: Implement test
        });
    });

    describe('loadSkillTree', () => {
        it('should load a skill tree by slug', async () => {
            // TODO: Implement test
        });
    });

    describe('selectSkill', () => {
        it('should select a skill', () => {
            // TODO: Implement test
        });
    });

    describe('acquireSkill', () => {
        it('should acquire a skill', async () => {
            // TODO: Implement test
        });
    });

    describe('removeSkill', () => {
        it('should remove a skill', async () => {
            // TODO: Implement test
        });
    });
});
