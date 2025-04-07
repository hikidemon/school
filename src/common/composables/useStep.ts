import { ref, readonly } from 'vue'

export type StepType =
  | 'haveSet'
  | 'dnaCollected'
  | 'delivery'
  | 'waitCourier'
  | 'sendCourier'
  | 'laboratory'
  | 'complete'

const currentStep = ref('haveSet')

export const useStep = () => {
  const setStep = (step: StepType) => {
    currentStep.value = step
  }

  return {
    currentStep: readonly(currentStep),
    setStep
  }
}
