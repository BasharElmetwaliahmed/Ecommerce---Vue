<template>
  <div
    class="modal fade"
    id="deleteConfirmModal"
    tabindex="-1"
    aria-labelledby="deleteConfirmModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Deletion</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="deleteConfirmModalLabel"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this product?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            :disabled="deleteLoading"
            class="btn btn-danger"
            @click="confirmDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deleteLoading"],
  methods: {
    confirmDelete() {
      this.$emit("confirmDelete");
    },
  },
};
</script>
