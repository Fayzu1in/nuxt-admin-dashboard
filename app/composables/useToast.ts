export const useToast = () => {
  const toast = useToastStore()

  return {
    success: (t: string) => toast.showSuccess(t),
    error: (t: string) => toast.showError(t),
  }
}
