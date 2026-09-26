require "active_storage/service/s3_service"

module ActiveStorage
  class Service::SupabaseS3Service < Service::S3Service
    private

    def private_url(key, expires_in:, filename:, disposition:, content_type:, **client_opts)
      object_for(key).presigned_url(
        :get,
        expires_in: expires_in.to_i,
        **client_opts
      )
    end
  end
end
